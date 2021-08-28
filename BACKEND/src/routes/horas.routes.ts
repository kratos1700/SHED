import { Router } from 'express';
import { //getHora,      
        //findAllCobrades, 
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
//.get(checkUser,findAllCobrades)


.post(checkUser,save)
.put(checkUser,update)
//ruta.route('/:idUsuario/:id')
ruta.route('/:id')
.delete(checkUser,remove)









export default ruta;