import express from "express";
import { has_role } from "@/middelwares";
import * as  catalogue_controller  from "./catalogue.controller";

const catalogue_routes = express.Router();

catalogue_routes.get('/',has_role('CLIENT', 'DELIVERY'), catalogue_controller.getMany);
catalogue_routes.get('/:id',has_role('ADMIN'), catalogue_controller.get);
catalogue_routes.get('/type/:type', has_role('ADMIN'), catalogue_controller.byType);
catalogue_routes.post('/',has_role('ADMIN'), catalogue_controller.create);
catalogue_routes.put('/:id',has_role('ADMIN'), has_role('ADMIN'), catalogue_controller.update);
catalogue_routes.delete('/:id',has_role('ADMIN'), catalogue_controller.remove);

export { catalogue_routes };