import {getAllUserConductores,createUserConductores,updateUserConductores,deleteUserConductores} from '../controllers/usuario_conductor_controller.mjs'
import express from 'express';

const routerUserConductor = express.Router();

routerUserConductor.post('/user_conductor',createUserConductores)
routerUserConductor.delete('/user_conductor/:userConductorId',deleteUserConductores)
routerUserConductor.get('/user_conductor',getAllUserConductores)
routerUserConductor.put('/user_conductor/:userConductorId',updateUserConductores)



export default routerUserConductor;