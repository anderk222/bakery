import { has_role } from '@/middelwares';
import express from 'express';
import * as order_cobtroller  from './order.controller';

const order_routes = express.Router();

order_routes.get('/',has_role('ADMIN', 'CLIENT','DELIVERY'), order_cobtroller.getMany);
order_routes.get('/:id',has_role('ADMIN', 'CLIENT','DELIVERY'), order_cobtroller.get);
order_routes.post('/', has_role('ADMIN', 'CLIENT','DELIVERY'), order_cobtroller.create);
order_routes.put('/:id', has_role('ADMIN', 'CLIENT','DELIVERY'), order_cobtroller.update);
order_routes.delete('/:id', has_role('ADMIN', 'CLIENT', 'DELIVERY'), order_cobtroller.remove);

export { order_routes };