import { print } from 'pdf-to-printer';

export async function printPDF(pdfData: string): Promise<void> {
  // Guarda el PDF en un archivo temporal
  const filePath = '/tmp/document.pdf';
  const buffer = Buffer.from(pdfData, 'base64');
  require('fs').writeFileSync(filePath, buffer);

  // Configura las opciones de impresión
  const options = {
    printer: 'Nombre_de_tu_impresora', // Asegúrate de reemplazar con el nombre de tu impresora
  };

  // Imprime el archivo PDF
  await print(filePath, options);
}