import { Router } from 'express';
import { //getHora,      
         
         remove,
         findAll,
         save,
         update} from '../controllers/horas.controller';
import { checkUser } from '../middleware/jwt.middelware';
         
const ruta = Router();




/**
 * DEFINIMOS LAS RUTAS DEL BACKEND
 */


//ruta.route('/horas')
//obtener horas
//.get(findAll);
//obtener hora por id
//ruta.get('/:id',getHora);
//crear horas

// actualizar horas

// eliminar horas


/* ruta.route('/:idUsuario')
.get(checkUser,findAll) */

ruta.route('/')
.get(checkUser,findAll)

.post(checkUser,save)
.put(checkUser,update)
ruta.route('/:idUsuario/:id')
.delete(checkUser,remove)
.put(checkUser,update)








export default ruta;