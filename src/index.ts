import express, {  Router } from 'express';
import bodyParser from 'body-parser';
import router from './routers/print';
import cors from 'cors'


const app = express();
const PORT = process.env.PORT ?? 4000;

app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.json());

const rutas:Router = router;
app.use(rutas)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
