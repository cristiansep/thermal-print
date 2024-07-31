import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

import fs from 'fs';
import path from 'path';
import https from 'https'

async function fetchImage(url: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      https.get(url, (res) => {
        const data: Uint8Array[] = [];
        res.on('data', (chunk) => {
          data.push(chunk);
        });
        res.on('end', () => {
          resolve(Buffer.concat(data));
        });
      }).on('error', (err) => {
        reject(err);
      });
    });
  }


export async function generatePDF2() {
    // Crear un nuevo documento PDF
    const pdfDoc = await PDFDocument.create();
  
    // Agregar una página al documento PDF
    const page = pdfDoc.addPage([290, 566.4]); // Ancho de 290px y altura aproximada de una hoja A4
  
    // Establecer fuentes
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  
    // Función para cargar imágenes desde una URL
    const loadImage = async (url: string) => {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      return arrayBuffer;
    };
  
    // Cargar y dibujar el logo
    // const logoUrl = 'https://mcusercontent.com/b585e65611799eae7e8631341/images/51fa0050-b523-4dd5-d948-b76c49d0b3af.jpg';
    // const logoBytes = await loadImage(logoUrl);
    // const logoImage = await pdfDoc.embedJpg(logoBytes);
    // const logoDims = logoImage.scale(0.7);
    const logoUrl = 'https://mcusercontent.com/b585e65611799eae7e8631341/images/51fa0050-b523-4dd5-d948-b76c49d0b3af.jpg';
    const logoBytes = await fetchImage(logoUrl);
    const logoImage = await pdfDoc.embedJpg(logoBytes);
    const logoDims = logoImage.scale(0.3);
  
    // page.drawImage(logoImage, {
    //   x: 50,
    //   y: page.getHeight() - 50 - logoDims.height,
    //   width: 150,
    //   height: 150
    // });
  
    // Dibuja el texto
    page.drawText('Reserva #3925614', {
      x: 50,
      y: page.getHeight() - 100,
      size: 10,
      font: helveticaFont,
      color: rgb(0, 0, 0)
    });
  
    // Cargar y dibujar el código QR
    // const qrCodeUrl = 'https://s3.amazonaws.com/transvip/staging/booking_QR_code_images/booking_bar_code_3925614';
    // const qrCodeBytes = await loadImage(qrCodeUrl);
    // const qrCodeImage = await pdfDoc.embedPng(qrCodeBytes);
    const qrCodeUrl = 'https://s3.amazonaws.com/transvip/staging/booking_QR_code_images/booking_bar_code_3925614';
    const qrCodeBytes = await fetchImage(qrCodeUrl);
    const qrCodeImage = await pdfDoc.embedPng(qrCodeBytes);
  
    page.drawImage(qrCodeImage, {
      x: 50,
      y: page.getHeight() - 250,
      width: 150,
      height: 150
    });
  
    page.drawText('PAGADA', {
      x: 50,
      y: page.getHeight() - 280,
      size: 18,
      font: helveticaFont,
      color: rgb(0, 0, 0)
    });
  
    // Agregar más texto y detalles
    page.drawText('Pilot Pilot', {
      x: 50,
      y: page.getHeight() - 300,
      size: 12,
      font: helveticaFont,
      color: rgb(0, 0, 0)
    });
  
    page.drawText('Reserva #3925614 CREADA', {
      x: 50,
      y: page.getHeight() - 320,
      size: 12,
      font: helveticaFont,
      color: rgb(0, 0, 0)
    });
  
    page.drawText('Hora de venta: 26 jul. 14:56 hrs', {
      x: 50,
      y: page.getHeight() - 340,
      size: 12,
      font: helveticaFont,
      color: rgb(0, 0, 0)
    });
  
    page.drawText('Taxi', {
      x: 50,
      y: page.getHeight() - 360,
      size: 12,
      font: helveticaFont,
      color: rgb(0, 0, 0)
    });
  
    page.drawText('Pasajeros: 1', {
      x: 50,
      y: page.getHeight() - 380,
      size: 12,
      font: helveticaFont,
      color: rgb(0, 0, 0)
    });
  
    page.drawText('Tarifa Variable: PERSONAL', {
      x: 50,
      y: page.getHeight() - 400,
      size: 12,
      font: helveticaFont,
      color: rgb(0, 0, 0)
    });
  
    // Detalles de la tarifa
    page.drawText('Tarifa Normal: $ 24.250', {
      x: 50,
      y: page.getHeight() - 420,
      size: 12,
      font: helveticaFont,
      color: rgb(0, 0, 0)
    });
  
    page.drawText('Tarifa a pagar: $ 24.250', {
      x: 50,
      y: page.getHeight() - 440,
      size: 12,
      font: helveticaFont,
      color: rgb(0, 0, 0)
    });
  
    page.drawText('Efectivo Pesos', {
      x: 50,
      y: page.getHeight() - 460,
      size: 12,
      font: helveticaFont,
      color: rgb(0, 0, 0)
    });
  
    page.drawText('Trayecto:', {
      x: 50,
      y: page.getHeight() - 480,
      size: 12,
      font: helveticaFont,
      color: rgb(0, 0, 0)
    });
  
    page.drawText('Desde: Aeropuerto SCL, Pudahuel, Región Metropolitana', {
      x: 50,
      y: page.getHeight() - 500,
      size: 12,
      font: helveticaFont,
      color: rgb(0, 0, 0)
    });
  
    page.drawText('Hacia: Vitacura, Región Metropolitana', {
      x: 50,
      y: page.getHeight() - 520,
      size: 12,
      font: helveticaFont,
      color: rgb(0, 0, 0)
    });
  
    // Datos adicionales
    page.drawText('Datos adicionales:', {
      x: 50,
      y: page.getHeight() - 540,
      size: 12,
      font: helveticaFont,
      color: rgb(0, 0, 0)
    });
  
    page.drawText('Solicitada por: Pilot Pilot', {
      x: 50,
      y: page.getHeight() - 560,
      size: 12,
      font: helveticaFont,
      color: rgb(0, 0, 0)
    });
  
    page.drawText('(*) Los valores pueden estar sujetos a modificaciones según convenio.', {
      x: 50,
      y: page.getHeight() - 580,
      size: 10,
      font: helveticaFont,
      color: rgb(0, 0, 0)
    });
  
    page.drawText('Cajero: Cristian Sepulveda', {
      x: 50,
      y: page.getHeight() - 600,
      size: 12,
      font: helveticaFont,
      color: rgb(0, 0, 0)
    });
  
    page.drawText('Impresión: 1', {
      x: 200,
      y: page.getHeight() - 600,
      size: 12,
      font: helveticaFont,
      color: rgb(0, 0, 0)
    });
  
    page.drawText('Fecha & Hora Impresión: 26/07/2024 14:55', {
      x: 50,
      y: page.getHeight() - 620,
      size: 12,
      font: helveticaFont,
      color: rgb(0, 0, 0)
    });
  
    // Información de contacto
    page.drawText('Página web: www.transvip.cl', {
      x: 50,
      y: page.getHeight() - 640,
      size: 12,
      font: helveticaFont,
      color: rgb(0, 0, 0)
    });
  
    page.drawText('Teléfono: +562 2677 3000', {
      x: 50,
      y: page.getHeight() - 660,
      size: 12,
      font: helveticaFont,
      color: rgb(0, 0, 0)
    });
  
    page.drawText('eMail: info@transvip.cl', {
      x: 50,
      y: page.getHeight() - 680,
      size: 12,
      font: helveticaFont,
      color: rgb(0, 0, 0)
    });
  
    // Serializar el documento PDF a un buffer
    const pdfBytes = await pdfDoc.save();
  
    // Guardar el PDF en un archivo temporal
    const pdfPath = path.join(__dirname, 'temp.pdf');
    fs.writeFileSync(pdfPath, pdfBytes);
  
    return pdfPath;
}


export async function generatePDF3() {
    // Crear un nuevo documento PDF
    const pdfDoc = await PDFDocument.create();
  
    // Ancho de 290px (80mm) y altura de 566.4px (200mm)
    const page = pdfDoc.addPage([80*2.83465, 566.4]);
  
    // Establecer fuentes
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  
  
    // Cargar y dibujar el logo
    const logoUrl = 'https://mcusercontent.com/b585e65611799eae7e8631341/images/51fa0050-b523-4dd5-d948-b76c49d0b3af.jpg';
    const logoBytes = await fetchImage(logoUrl);
    const logoImage = await pdfDoc.embedJpg(logoBytes);

    const logoWidth = 200;
    const logoHeight = 50;

     // Dibuja el texto
     let yPosition = page.getHeight();
     console.log(yPosition)

     yPosition -= logoHeight;
  
     page.drawImage(logoImage, {
        x: 10,
        y: yPosition,
        width: logoWidth,
        height: logoHeight
    });
    
    // Actualiza la posición y después de dibujar el logo
    yPosition -= 20;
  

    const drawText = (text: string, size: number, offsetX: number = 10) => {
        page.drawText(text, {
            x: offsetX,
            y: yPosition,
            size,
            font: helveticaFont,
            color: rgb(0, 0, 0)
        });
        yPosition -= size + 2; // Ajusta el espacio entre líneas
    };

    drawText('Reserva #3925614', 10);

    // Cargar y dibujar el código QR
    const qrCodeUrl = 'https://s3.amazonaws.com/transvip/staging/booking_QR_code_images/booking_bar_code_3925614';
    const qrCodeBytes = await fetchImage(qrCodeUrl);
    const qrCodeImage = await pdfDoc.embedPng(qrCodeBytes);
  
    page.drawImage(qrCodeImage, {
        x: 10,
        y: yPosition - 150,
        width: 150,
        height: 150
    });
    yPosition -= 170; // Ajusta después del código QR

    drawText('PAGADA', 18);
    drawText('Pilot Pilot', 12);
    drawText('Reserva #3925614 CREADA', 12);
    drawText('Hora de venta: 26 jul. 14:56 hrs', 12);
    drawText('Taxi', 12);
    drawText('Pasajeros: 1', 12);
    drawText('Tarifa Variable: PERSONAL', 12);
    drawText('Tarifa Normal: $ 24.250', 12);
    drawText('Tarifa a pagar: $ 24.250', 12);
    drawText('Efectivo Pesos', 12);
    drawText('Trayecto:', 12);
    drawText('Desde: Aeropuerto SCL, Pudahuel, Región Metropolitana', 12);
    drawText('Hacia: Vitacura, Región Metropolitana', 12);
    drawText('Datos adicionales:', 12);
    drawText('Solicitada por: Pilot Pilot', 12);
    drawText('(*) Los valores pueden estar sujetos a modificaciones según convenio.', 10);
    drawText('Cajero: Cristian Sepulveda', 12);
    drawText('Impresión: 1', 12, 160); // Ajuste del x para el texto "Impresión: 1"
    drawText('Fecha & Hora Impresión: 26/07/2024 14:55', 12);
    drawText('Página web: www.transvip.cl', 12);
    drawText('Teléfono: +562 2677 3000', 12);
    drawText('eMail: info@transvip.cl', 12);
  
    // Serializar el documento PDF a un buffer
    const pdfBytes = await pdfDoc.save();
  
    // Guardar el PDF en un archivo temporal
    const pdfPath = path.join(__dirname, 'temp.pdf');
    fs.writeFileSync(pdfPath, pdfBytes);
  
    return pdfPath;
}


export async function generatePDF4() {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([210, 466.4]);
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const testFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

  let yPosition = page.getHeight();

  const drawText = (text: string, size: number, offsetX: number = 10, isBold: boolean = false) => {
      page.drawText(text, {
          x: offsetX,
          y: yPosition,
          size,
          font: helveticaFont,
          color: rgb(0, 0, 0),
      });
      yPosition -= 10;
  };

  const drawTextCaracters = (text: string, size: number, offsetX: number = 10, isBold: boolean = false) => {
    page.drawText(text, {
        x: offsetX,
        y: yPosition,
        size,
        font: helveticaFont,
        color: rgb(0, 0, 0),
        lineHeight: size * 1.2
    });
    yPosition -= 10;
};

  const drawCenteredText = (text: string, size: number) => {
      const textWidth = testFont.widthOfTextAtSize(text, size);
      const xPosition = (page.getWidth() - textWidth) / 2;
      drawText(text, size, xPosition);
  };

  drawCenteredText('==== TRANSVIP ====', 9);
  drawCenteredText('EMPRESA DE TRANSPORTES TRANSVIP SPA', 9);
  drawCenteredText('76.102.176-1', 9);
  drawCenteredText('Aeropuerto de Santiago', 9);
  drawCenteredText('www.transvip.cl', 9);
  yPosition -= 10;

  drawText('Fecha: 2024-07-08 19:34:58', 8);
  drawText('Codigo de comercio: 11111', 8);
  drawText('Id de operacion: 33333', 8);
  drawText('Codigo de autorizacion: 654321', 8);
  drawText('Tarjeta: *********9999 / MAS (CENCOSUD) Credito', 8);
  drawText('Monto total: $8,900', 8);
  yPosition -= 10;

  drawCenteredText('------------------------------------', 12);
  drawCenteredText('Gracias por viajar con nosotros', 8);
  drawCenteredText('------------------------------------', 12);
  yPosition -= 10;

  drawCenteredText('#### QR ####', 8);

  // Aquí deberías agregar el código para generar y dibujar el QR
  // Por ejemplo:
  // const qrImage = await generateQRCode('https://www.transvip.cl');
  // page.drawImage(qrImage, {
  //     x: (page.getWidth() - 100) / 2,
  //     y: yPosition - 110,
  //     width: 100,
  //     height: 100
  // });
  const qrCodeUrl = 'https://s3.amazonaws.com/transvip/staging/booking_QR_code_images/booking_bar_code_3925614';
  const qrCodeBytes = await fetchImage(qrCodeUrl);
  const qrCodeImage = await pdfDoc.embedPng(qrCodeBytes);

  page.drawImage(qrCodeImage, {
        x: (page.getWidth() - 100) / 2,
      y: yPosition - 110,
      width: 100,
      height: 100
  });
  yPosition -= 120;

  drawText('Numero de reserva: 99999', 8);
  drawText('Direccion de destino: Agustinas 640, Santiago', 8);
  drawText('Cantidad de pasajeros: 4', 8);
  yPosition -= 10;

  drawCenteredText('-------------------------------------', 12);
  const reminderText = 'Recuerda, los traslados desde el aeropuerto son validos hasta 24 horas luego de haber sido solicitados.';
  const words = reminderText.split(' ');
  let line = '';
  for (const word of words) {
      if ((line + word).length > 40) {
        drawCenteredText(line, 8);
          line = word + ' ';
      } else {
          line += word + ' ';
      }
  }
  if (line) drawCenteredText(line, 8);
  drawCenteredText('-------------------------------------', 12);

  const pdfBytes = await pdfDoc.save();
  const pdfPath = path.join(__dirname, 'temp.pdf');
  fs.writeFileSync(pdfPath, pdfBytes);

  return pdfPath;
}