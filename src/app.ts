import express from 'express';
import usuarioRoutes from './routes/usuario.routes';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path';

const app = express();

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

app.use(express.json());
app.use(usuarioRoutes); // monta as rotas

export default app;