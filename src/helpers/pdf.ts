import puppeteer from 'puppeteer';
import fs from 'fs';

export async function generatePDF(htmlContent: string): Promise<string> {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Establece el contenido HTML
  await page.setContent(htmlContent);

  // Genera el PDF
  const pdfBuffer = await page.pdf({ format: 'A4' });

  // Guarda el PDF en un archivo temporal
  const filePath = '/tmp/generated.pdf';
  fs.writeFileSync(filePath, pdfBuffer);

  await browser.close();
  return filePath;
}