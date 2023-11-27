// Importación de módulos
import express from "express";
import dotenv from 'dotenv';
import path from 'path';
import cors from "cors";
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from "swagger-jsdoc";
import foodRouter from './routers/food.router';
import userRouter from './routers/user.router';
import orderRouter from './routers/order.router';
import { dbConnect } from './configs/database.config';

// Configuración de variables de entorno
dotenv.config();

// Conexión a la base de datos
dbConnect();

// Configuración de la especificación Swagger
const swaggerSpec = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'BackEnd YaviFood API',
            description: 'Grupo 5: Jinson Medina, Angeles Quinatoa, Alessandro Cisnero, Mishel Abendaño',
            version: '1.0.0',
        },
        servers: [
            {
                url: "http://localhost:5000"
            }
        ]
    },
    apis: [`${path.join(__dirname, './routers/*.ts')}`], // Rutas de tus archivos TypeScript que contienen JSDoc
};

// Configuración del puerto del servidor
const port = process.env.PORT || 5000;

// Creación de la aplicación Express
const app = express();

// Middlewares
app.use(express.json()); // Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(cors()); // Middleware para habilitar el CORS
app.use("/documentacion", swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(swaggerSpec))); // Middleware para la documentación Swagger

// Rutas
app.use("/api/foods", foodRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

// Configuración de la interfaz estática
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
});

// Inicio del servidor
app.listen(port, () => {
    console.log("Servidor conectado en http://localhost:" + port);
});
