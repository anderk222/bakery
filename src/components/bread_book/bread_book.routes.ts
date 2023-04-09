import express from 'express';
import { has_role } from '@/middelwares/role_checker';
import * as bread_book_controller  from './bread_book.controller';

const bread_book_routes = express.Router();

bread_book_routes.get('/', has_role('CLIENT', 'DELIVERY'),bread_book_controller.getMany);
bread_book_routes.get('/:id', has_role('CLIENT', 'DELIVERY'),bread_book_controller.get);
bread_book_routes.post('/', has_role('ADMIN'),bread_book_controller.create);
bread_book_routes.put('/:id', has_role('ADMIN'),bread_book_controller.update);
bread_book_routes.delete('/:id', has_role('ADMIN'), bread_book_controller.remove);

export { bread_book_routes };