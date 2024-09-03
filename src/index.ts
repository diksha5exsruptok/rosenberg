// src/index.ts
import express from 'express'; 
import bodyParser from 'body-parser'; 
import cors from 'cors';
import routes from './routes/routes';

const app = express(); 

// Middleware
app.use(bodyParser.json()); 
app.use(cors());

// API Routes
app.use(`/api/`, routes);

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});