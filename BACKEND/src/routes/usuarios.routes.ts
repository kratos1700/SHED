/**
 * ARCHIVO DONDE SE CREARAN LAS RUTAS PARA LOS USUARIOS
 */

import { Router } from "express";
import {  findAll, save, update, findOneById, remove } from "../controllers/usuarios.controller";
import { checkIsAdmin, checkUser } from "../middleware/jwt.middelware";

const ruta = Router();

ruta.route('/')
.get(checkIsAdmin, findAll)
.post(save);
ruta.route('/:id') // :id seria para un parametro dinamico
.put(checkUser,update)
.get(checkUser ,findOneById)
.delete(checkUser,remove)


/*ruta.route('/toAdmin/:idUsuario')
    .put(checkIsAdmin,changeToAdmin)*/

// EXPORTAMOS LAS RUTAS
export default ruta;