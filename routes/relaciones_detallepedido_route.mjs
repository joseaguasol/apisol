import { createDetalle,getDetalles,getDetallePedidoXPedidos } from "../controllers/relacion_detallepedido_controller.mjs";

import express from 'express';

const routerDetallePedido = express.Router();

routerDetallePedido.post('/detallepedido',createDetalle)
routerDetallePedido.get('/detallepedido',getDetalles)
routerDetallePedido.get('/detallepedido/:pedidoID',getDetallePedidoXPedidos)


export default routerDetallePedido