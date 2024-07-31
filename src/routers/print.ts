import { Router } from 'express';
import { directPrint, generatePDF, newPrint, printFront, printFront2, printHTML, printReceipt, printThermal } from '../controllers/print.controller';
const router:Router = Router();

router.post('/print-html', printHTML);
router.post('/generate-pdf-print', generatePDF);
router.post('/direct-print', printReceipt);
router.post('/new-print', newPrint);
router.post('/print-front', printFront2);
router.post('/thermal', printThermal);


export = router;