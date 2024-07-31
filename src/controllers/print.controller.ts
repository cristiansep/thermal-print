import { Request, Response } from "express";
import { htmlContent } from "../helpers/html-print";
import { generatePDFTOHTML } from "../helpers/pdf";
import { print, PrintOptions } from "pdf-to-printer";
import { generatePDF3, generatePDF4 } from "../helpers/pdf-generate";
import fs from 'fs';

import { join } from 'path';
import escpos, { Adapter } from 'escpos';
import axios from "axios";
import EscPosEncoder from 'esc-pos-encoder';
import { promisify } from 'util';
import * as childProcess from 'child_process';
import { createCanvas, loadImage } from 'canvas';
//import escposUSB from 'escpos-usb'; // Importación con ES6

import * as USB from "usb";
import { ThermalPrinter, types } from "node-thermal-printer";



//escpos.USB = escposUSB


const VENDOR_ID = 0x0416; // Por ejemplo: 0x1A2B
const PRODUCT_ID = 0x5011; // Por ejemplo: 0x3C4D



async function printPDF(filePath: string): Promise<void> {
    // Configura las opciones de impresión
    const options = {
      printer: 'POS-80', // Asegúrate de reemplazar con el nombre de tu impresora
    };
  
    // Imprime el archivo PDF
    await print(filePath, options);
  }


export const printHTML = async (req: Request, res: Response) => {

    if (!htmlContent) {
      return res.status(400).json({ error: 'No HTML content provided.' });
    }
  
    try {
      // Genera el PDF a partir del contenido HTML
      const pdfPath = await generatePDFTOHTML(htmlContent);
  
      // Imprime el archivo PDF
      await printPDF(pdfPath);
      res.status(200).json({ message: 'HTML printed successfully.' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Error processing the request.' });
    }
  };


  
  export const generatePDF = async (req: Request, res: Response) => {
    try {
      // const pdfPath = await generatePDF2();
      const pdfPath = await generatePDF4();
  
      const options:PrintOptions = {
        printer: 'POS-80', // Asegúrate de reemplazar con el nombre de tu impresora
        // paperSize: '80(72)x3276mm',
      };
    
      // Imprime el archivo PDF
      await print(pdfPath, options);
  
      res.send('PDF generado e impreso correctamente');
  
      // Eliminar el archivo temporal después de la impresión
      fs.unlinkSync(pdfPath);
    } catch (error) {
      console.error('Error al generar o imprimir el PDF:', error);
      res.status(500).send('Error al generar o imprimir el PDF');
    }
  };




  export const directPrint = async (req: Request, res: Response) => {
    try {
      const qrImageUrl = "https://s3.amazonaws.com/transvip/staging/booking_QR_code_images/booking_bar_code_3925614";
  
      // Descargar la imagen del QR
      const response = await axios({
        url: qrImageUrl,
        method: 'GET',
        responseType: 'stream'
      });
      const imagePath = join(__dirname, 'qr.png');
  
      // Guardar la imagen en el servidor
      const writeStream = fs.createWriteStream(imagePath);
    response.data.pipe(writeStream);
  
      writeStream.on('finish', () => {
        // Configurar la impresora (cambia la IP y el puerto según tu configuración)
        const device = new escpos.USB();
        const printer = new escpos.Printer(device);
  
        device.open(() => {
          escpos.Image.load(imagePath, (image: any) => {
            printer.align('CT')
                   .image(image, 'S8')
                   .cut()
                   .close();
          });
        });
  
        res.status(200).send('Printing...');
      });
  
      writeStream.on('error', (error) => {
        console.error('Error writing the image:', error);
        res.status(500).send('Error writing the image');
      });
    } catch (error) {
      console.error('Error printing QR code:', error);
      res.status(500).send('Error printing QR code');
    }
  };


//   interface Adapter {
//     write(data: Buffer, callback: (err?: Error) => void): void;
//     close(callback: (err?: Error) => void): void;
//     open(callback: (err?: Error) => void): void;
// }

// Función para crear un adaptador a partir de un dispositivo USB
const createAdapter = (device: USB.Device): Adapter => {
  const adapter: Adapter = {
      write: (data: Buffer, callback: (err?: any) => void): Adapter => {
          const requestType = 0x40; // Tipo de solicitud (vendor-specific)
          const request = 0; // Solicitud (puede depender de tu impresora)
          const value = 0; // Valor (puede depender de tu impresora)
          const index = 0; // Índice (puede depender de tu impresora)

          device.controlTransfer(requestType, request, value, index, data, (err) => {
              callback(err);
          });

          return adapter; // Retorna el adaptador
      },
      // close: (callback: (err?: Error) => void): void => {
      //     device.close();
      //     callback();
      // },
      open: (callback: (err?: Error) => void): Adapter => {
          device.open();
          // callback();
          return adapter;
      },
  };

  return adapter; // Retorna el adaptador completo
};

export const printReceipt = (req: Request, res: Response) => {
  const device = USB.findByIds(VENDOR_ID, PRODUCT_ID);

  console.log("----------------------");
  console.log(VENDOR_ID)
  console.log(PRODUCT_ID)
  console.log(device);
  console.log("----------------------");

  if (!device) {
      return res.status(404).json({ error: 'Impresora no encontrada' });
  }

  try {
      device.open();
  } catch (error) {
      console.error('Error al abrir el dispositivo:', error);
      return res.status(500).json({ error: 'Error al abrir el dispositivo' });
  }

  const adapter = createAdapter(device);
  
  adapter.open((error:boolean) => {
      if (error) {
          console.error('Error al abrir el dispositivo:', error);
          return res.status(500).json({ error: 'Error al abrir el dispositivo' });
      }

      const printer = new escpos.Printer(adapter);

      printer
          .font('A')
          .align('CT')
          .style('B')
          .size(1, 1)
          .text('¡Hola, mundo!')
          .text('Este es un texto de prueba.')
          .barcode('1234567', 'EAN8')
          .qrimage('https://github.com/song940/node-escpos', function (err) {
              if (err) {
                  console.error('Error al imprimir el código QR:', err);
                  return res.status(500).json({ error: 'Error al imprimir el código QR' });
              }
          })
          .cut()
          .close((err) => {
              if (err) {
                  console.error('Error al cerrar el dispositivo:', err);
                  return res.status(500).json({ error: 'Error al cerrar el dispositivo' });
              }
              res.status(200).json({ message: 'Impresión realizada correctamente' });
          });
  });
};


export const newPrint = async (req: Request, res: Response) => {
  try {
    const qrImageUrl = "https://s3.amazonaws.com/transvip/staging/booking_QR_code_images/booking_bar_code_3925614";
    
    // Usar Axios para obtener la imagen
    const response = await axios.get(qrImageUrl, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data);

    // Cargar la imagen en un canvas
    const img = await loadImage(buffer);

    const encoder = new EscPosEncoder();
    const encoded = encoder
      .newline()
      .image(img, 240, 240) // Cambiar el buffer por la imagen cargada
      .newline()
      .newline()
      .cut()
      .encode();

    // Guardar el archivo para imprimir
    const filePath = 'print-output.bin';
    const writeFile = promisify(fs.writeFile);
    await writeFile(filePath, Buffer.from(encoded));

    // Imprimir usando lpr (comando para Unix-like sistemas)
    // childProcess.execSync(`lpr -l ${filePath}`);
    const printerName = 'POS-80'; // Cambia esto por el nombre de tu impresora
    childProcess.execSync(`print /D:"${printerName}" ${filePath}`);

    res.status(200).send('Printed successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to print');
  }
}


export const printFront = (req: Request, res: Response) => {
  const { pdfData } = req.body;
  const pdfBuffer = Buffer.from(pdfData, 'base64');
  const filePath = './output.pdf';

  fs.writeFile(filePath, pdfBuffer, (err) => {
    if (err) {
      res.status(500).send('Error writing PDF file.');
      return;
    }

    print(filePath)
      .then(() => {
        fs.unlink(filePath, (unlinkErr) => {
          if (unlinkErr) {
            console.error('Error deleting PDF file:', unlinkErr);
          }
        });
        res.status(200).send('PDF sent to printer.');
      })
      .catch((printErr) => {
        res.status(500).send('Error printing PDF.');
        console.error('Error printing PDF:', printErr);
      });
  });
}

export const printFront2 = async (req: Request, res: Response) => {
  const { pdfData } = req.body;
  const pdfBuffer = Buffer.from(pdfData, 'base64');
  const filePath = './output.pdf';

  try {
    // Escribir el PDF en el sistema de archivos
    fs.writeFileSync(filePath, pdfBuffer);

    // Imprimir el PDF
    await printPDF(filePath);

    // Eliminar el archivo después de la impresión
    fs.unlinkSync(filePath);

    // Enviar respuesta exitosa
    res.status(200).send('PDF sent to printer.');
  } catch (error) {
    // Manejo de errores
    console.log(error)
    // if (error.code === 'ENOENT') {
    //   res.status(404).send('File not found.');
    // } else {
    //   console.error('Error:', error);
    //   res.status(500).send('Error processing the request.');
    // }
  }
};

const printer = new ThermalPrinter({
  type: types.EPSON, // o types.STAR, dependiendo de tu impresora 
  interface: 'USB001', // Cambia a la dirección IP y puerto de tu impresora 
  // options: { timeout: 5000, },
});

export const printThermal = async (req: Request, res: Response) => { 
  const { text } = req.body ?? "aksdjhksdhdasjk"; 
  if (!text) { return res.status(400).json({ error: 'Text is required' }); } 
  const isConnected = await printer.isPrinterConnected();

  console.log(isConnected)


  try { 
    printer.clear(); 
    printer.alignCenter(); 
    printer.println(text); 
    printer.cut();
    
    await printer.execute(); 
    
    res.send(printer)
    // res.status(200).json({ message: 'Printed successfully' }); 
  } catch (error) { 
    console.error('Error printing:', error); 
    res.status(500).json({ error: 'Failed to print' }); 
  
  } }