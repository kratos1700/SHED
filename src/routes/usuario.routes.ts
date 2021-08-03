import { Router } from 'express';
import { getUsuario, 
         getUsuarios,
         postUsuario, 
         putUsuario,
         deleteUsuario,
         } from '../controllers/usuarios.controller';

const ruta = Router();




/**
 * DEFINIMOS LAS RUTAS DEL BACKEND
 */
//obtener usuarios
ruta.get('/',getUsuarios);
//obtener usuario por id
ruta.get('/:id',getUsuario);
//crear usuario
ruta.post('/', postUsuario);
// actualizar usuario
ruta.put('/:id',putUsuario);
// eliminar usuario
ruta.delete('/:id',deleteUsuario);









export default ruta;