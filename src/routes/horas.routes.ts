import { Router } from 'express';
import { getHora,      
         
         deleteHora,
         findAll,
         save,
         update} from '../controllers/horas.controller';
         
const ruta = Router();




/**
 * DEFINIMOS LAS RUTAS DEL BACKEND
 */
//obtener horas
ruta.get('/',findAll);
//obtener hora por id
ruta.get('/:id',getHora);
//crear horas
ruta.post('/:id', save);
// actualizar horas
ruta.put('/:id',update);
// eliminar horas
ruta.delete('/:id',deleteHora);








export default ruta;