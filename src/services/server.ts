import express from 'express';
import * as http from 'http';
import Logger from './logger';
import mainRouter from '../routes';
import compression from 'compression';
import cors from 'cors';
import { ErrorRequestHandler, Request, Response } from 'express';
import path from 'path';
import SwaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Chatbot

app.get('/chatbot', (req: Request, res: Response) => {
  res.render('index')
});

// Error Handler

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  Logger.error(`Hubo un error ${err.message}`);

  const status = err.statusCode || 500;
  const msg = err.message || 'Internal Server Error';
  const stack = err.stack;

  Logger.error(err);

  res.status(status).send({
    msg,
    stack
  })
};

app.use(errorHandler);

// Configuro el uso de compression, cors y rutas

app.use(compression());
app.use(cors());
app.use('/api', mainRouter);

// Configuro la documentacion

const swaggerPath = path.resolve(process.cwd(), './swagger.yml');
const swaggerDoc = YAML.load(swaggerPath);

app.use('/api-docs', SwaggerUi.serve, SwaggerUi.setup(swaggerDoc));

// Respuesta por default

app.use((req, res) => {
  res.status(404).json({
    msg: 'La ruta no existe'
  });
});

const HTTPServer = http.createServer(app);

export default HTTPServer;