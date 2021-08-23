import { Router } from 'express';
import { 
         findAll, remove, save, update} from '../controllers/dietas.controller';
import { checkUser } from '../middleware/jwt.middelware';

const ruta = Router();




/**
 * DEFINIMOS LAS RUTAS DEL BACKEND
 */
//obtener dietas
ruta.route('/:idUsuario')
.get(checkUser,findAll)
.post(checkUser,save)
.put(checkUser,update)
ruta.route('/:idUsuario/:id')
.delete(checkUser,remove)
.put(checkUser,update)








export default ruta;