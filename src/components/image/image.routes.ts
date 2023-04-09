import { has_role } from "@/middelwares";
import express from "express";
import * as image_controller  from "./image.controller";

const image_routes = express.Router();

image_routes.get('/', image_controller.getMany);
image_routes.get('/:id', image_controller.get);
image_routes.get('/by_bread_book/:id', image_controller.byProduct);
image_routes.post('/', has_role('ADMIN'), image_controller.create);
image_routes.put('/:id', has_role('ADMIN'), image_controller.update);
image_routes.delete('/:id', has_role('ADMIN'), image_controller.remove);

export { image_routes };