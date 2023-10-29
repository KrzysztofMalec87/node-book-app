import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { Endpoint } from '@/constants/endpoints';

const router = express.Router();

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API V1 Documentation',
            version: '1.0.0',
        },
    },
    apis: ['dist/routes/**/*/index.js'],
};

const specs = swaggerJsdoc(options);

router.use(Endpoint.SWAGGER, swaggerUi.serve);
router.get(Endpoint.SWAGGER, swaggerUi.setup(specs));

export default router;
