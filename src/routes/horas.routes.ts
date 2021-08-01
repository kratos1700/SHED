import { Router } from 'express';
import { getHoras, 
         getHora,
         postHora, 
         putHora,
         deleteHora} from '../controllers/horas.controller';
         
const ruta = Router();




/**
 * DEFINIMOS LAS RUTAS DEL BACKEND
 */
//obtener horas
ruta.get('/',getHoras);
//obtener hora por id
ruta.get('/:id',getHora);
//crear horas
ruta.post('/', postHora);
// actualizar horas
ruta.put('/:id',putHora);
// eliminar horas
ruta.delete('/:id',deleteHora);








export default ruta;