import express, { Request, Response } from 'express';
import { generatePDF } from './helpers/pdf';
import { print } from 'pdf-to-printer';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());

app.post('/print-html', async (req: Request, res: Response) => {
  const { htmlContent } = req.body;

  if (!htmlContent) {
    return res.status(400).json({ error: 'No HTML content provided.' });
  }

  try {
    // Genera el PDF a partir del contenido HTML
    const pdfPath = await generatePDF(htmlContent);

    // Imprime el archivo PDF
    await printPDF(pdfPath);
    res.status(200).json({ message: 'HTML printed successfully.' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error processing the request.' });
  }
});

async function printPDF(filePath: string): Promise<void> {
  // Configura las opciones de impresión
  const options = {
    printer: 'STMicroelectronics POS80 Printer USB', // Asegúrate de reemplazar con el nombre de tu impresora
  };

  // Imprime el archivo PDF
  await print(filePath, options);
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
