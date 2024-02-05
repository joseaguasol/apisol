import { getAllUbicaciones,createUbicacion } from '../controllers/relaciones_ubicacion_controller.mjs';

import express from 'express';

const routerUbicacion= express.Router();

routerUbicacion.post('/ubicacion',createUbicacion)
routerUbicacion.get('/ubicacion',getAllUbicaciones)


export default routerUbicacion