import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

export async function generatePDFTOHTML(htmlContent: string): Promise<string> {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Establece el contenido HTML
  await page.setContent(htmlContent);

  const pdfOptions = {
    width: '300',  // Ancho del papel de tu impresora térmica (ajústalo según sea necesario)
    height: '1156.875', // Deja que la altura sea automática
  };

  // Genera el PDF
  const pdfBuffer = await page.pdf(pdfOptions);

  // Guarda el PDF en un archivo temporal
  // const filePath = '/tmp/generated.pdf';
  // fs.writeFileSync(filePath, pdfBuffer);
  const tmpDir = 'C:\\tmp'; // Cambia a la ruta de Windows
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir);
  }
  const filePath = path.join(tmpDir, 'generated.pdf');
  fs.writeFileSync(filePath, pdfBuffer);

  await browser.close();
  return filePath;
}