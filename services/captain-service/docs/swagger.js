import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const swaggerSpec = swaggerJsdoc({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Captain Service API',
            version: '1.0.0'
        },
        servers: [
            { url: 'http://localhost:3002' }
        ],
        components: {
            securitySchemes: {
                cookieAuth: {
                    type: 'apiKey',
                    in: 'cookie',
                    name: 'token'
                }
            }
        }
    },
    // Load YAML files from docs/paths for scalability
    apis: [path.join(__dirname, './paths/*.yaml')]
});

export default swaggerSpec;


