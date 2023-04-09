import express from 'express';
import * as user_controller from './user.controller';

const user_routes = express.Router();

user_routes.get('/', user_controller.getMany);
user_routes.get('/:id', user_controller.get);
user_routes.get('/type/:role', user_controller.byRole);
user_routes.post('/', user_controller.create);
user_routes.put('/:id', user_controller.update);
user_routes.delete('/:id', user_controller.remove);

export { user_routes };