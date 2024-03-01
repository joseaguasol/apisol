import { createVehiculoProductos,getVehiculosProductos } from "../controllers/ventas_vehiculo_producto_controller.mjs";

import express from 'express';

const routerVehiculoProducto= express.Router();
routerVehiculoProducto.post('/vehiculo_producto',createVehiculoProductos)
routerVehiculoProducto.get('/vehiculo_producto',getVehiculosProductos)

export default routerVehiculoProducto;
