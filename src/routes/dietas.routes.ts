import { Router } from 'express';
import { getDietas, 
         getDieta,
         postDieta, 
         putDieta,
         deleteDieta} from '../controllers/dietas.controller';

const ruta = Router();




/**
 * DEFINIMOS LAS RUTAS DEL BACKEND
 */
//obtener dietas
ruta.get('/',getDietas);
//obtener dieta por id
ruta.get('/:id',getDieta);
//crear dieta
ruta.post('/', postDieta);
// actualizar dieta
ruta.put('/:id',putDieta);
// eliminar dieta
ruta.delete('/:id',deleteDieta);








export default ruta;