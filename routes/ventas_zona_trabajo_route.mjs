import {createZonas,getZonas} from '../controllers/ventas_zona_trabajo_controller.mjs';

import express from 'express';

const routerZonas= express.Router();

routerZonas.post('/zona',getZonas)
routerZonas.get('/zona',createZonas)

export default routerZonas