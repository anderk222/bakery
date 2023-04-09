import express from 'express';
import { config } from "dotenv";
import { Res, Req } from '@/types';
import {
    catalogue_routes, user_routes, image_routes,
    bread_book_routes,
    order_routes, 
}  
from '@/components/index';
import morgan from 'morgan';
import cors from 'cors'; 
import { error_handler } from './middelwares/error_handler';
import { serve, setup } from 'swagger-ui-express' 
import swaggerFile from '../swagger.output.json'
import { Config } from '@/config'; 
 
// Para acceder a variables de entorno
config();

const app = express();
 
// anadir variables al nuestro app objeto
app.set('PORT', Config.app_port || 2222);

// anadir middelwares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({ origin : '*' }));

//app.use('/api/panaderia/order', bre);

app.use('/doc', serve, setup(swaggerFile))

app.use('/api/panaderia/user', user_routes);
app.use('/api/panaderia/bread_box', bread_book_routes);
app.use('/api/panaderia/image', image_routes);
app.use('/api/panaderia/catalogue', catalogue_routes);
app.use('/api/panaderia/order', order_routes);

app.use(error_handler);

// 404 NOT FOUND
app.get('/*', (req: Req, res: Res<null>) => {

    res.status(404).json({ message: 'resource not found', success: false });

});

export { app };