import { createPedidos, getLastPedidos, getPedidos,getPedidosClientes,getUbicacionesClienteNRS, deletePedidos,updateEstadoPedidos, updateRutaPedidos,getPedidosConductor} from '../controllers/ventas_pedido_controller.mjs';
import express from 'express';

const routerVentasPedido = express.Router();
routerVentasPedido.get('/pedido',getPedidos)
routerVentasPedido.post('/pedido',createPedidos)
routerVentasPedido.get('/pedido_cliente/:clienteID',getPedidosClientes)
routerVentasPedido.get('/pedido_clientenr/:clienteNRID',getUbicacionesClienteNRS)
routerVentasPedido.get('/pedido_conductor/:rutaID/:conductorID',getPedidosConductor)
routerVentasPedido.get('/pedido_last/:clienteID',getLastPedidos)
routerVentasPedido.delete('/pedido/:pedidoID', deletePedidos)
routerVentasPedido.put('/pedido_conductor/:pedidoID', updateEstadoPedidos)
routerVentasPedido.put('/pedidoruta/:pedidoID',updateRutaPedidos)


export default routerVentasPedido;
