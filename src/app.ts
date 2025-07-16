import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import 'dotenv/config';

import authRoutes from './routes/auth.routes';
import usuarioRoutes from './routes/usuario.routes';
import moveisRoutes from './routes/imoveis.routes';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();

// Segurança e parsing
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
    },
  },
  apis: [
    path.join(__dirname, 'docs/routes/*.yaml'),
    path.join(__dirname, 'docs/schemas.yaml')
  ],
};

const specs = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(authRoutes);
app.use(usuarioRoutes);
app.use(moveisRoutes);

// Middleware de erro 404
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    error: 'Rota nao encontrada',
  });
});

// Middleware de erro global
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Erro interno do servidor',
    message: err.message,
  });
});

export default app;
