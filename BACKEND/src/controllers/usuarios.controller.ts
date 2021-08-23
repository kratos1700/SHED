/**
 * ARCHIVO PARA LAS FUNCIONES DE LOS USUARIOS
 * 
 */

 import * as jwt from 'jsonwebtoken';
import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { UsuarioModel } from "../models/usuario.model";

import { UsuarioService } from "../service/usuarios.service";
// en esta linia podemos cambiar si trabajamos con un bbdd my sql o mongo 
let usuarioService = new UsuarioService();

//funcion buscar todos, poniendo _ ignoramos el parametro
export async function findAll(_: Request, res: Response) {

    // let usuarioss = await
    usuarioService.findAll()
        .then((usuarios: UsuarioModel[]) => {
            return res.json({ usuarios })
        })
        .catch((err: Error) => {
            //lanzamos un error de servicio
            return res.status(500).json({
                msg: 'Error en la recuperacion de los datos ',
                error: err
            })
        })
    // res.send(usuarioss);
}

// funcion de buscar usuarios por id
export function findOneById(req: Request, res: Response) {

    let id = req.params.id;
    const token = req.get('Authorization');
    if (token) {
        let decoded: JwtPayload | null = jwt.decode(token, {json: true})
        if (decoded) {
            console.log(decoded.id);


        }
    }

    usuarioService.findOneById(Number(id))
        .then((usuario: UsuarioModel | null) => {

            // mostramos un mensaje de id no encontrado
            if (usuario === null) {
                //mandamos un error de recurso no encontrado
                res.status(404).json({
                    result: 'Error',
                    msg: `El usuario con el id: ${id} no se ha encontrado!!`
                })
            }
            return res.json({ usuario })
        })
        .catch((err: Error) => {
            //lanzamos un error de servicio
            return res.status(500).json({
                msg: 'Error en la recuperacion de los datos ',
                error: err
            })
        })


}


export function save(req: Request, res: Response) {

    //al desestructurar datos se pueden poner alias poniendo : y el nombre que queramos
    // const {nombre, username:usernameBody} = req.body;  
    const { nombre, email, password, username } = req.body;

    // comprobamos que los datos que pedimos esten rellenados 
    if (username === undefined || email === undefined || password === undefined || nombre === undefined) {
        return res.status(400).json({
            msg: 'Revisa los datos enviados.'
        })
    }
    //guardamos el usuario
    return usuarioService.save(nombre, email, password, username)
        .then((usuario: UsuarioModel) => {
            return res.json({ usuario })
        })
        // controlamos el error
        .catch((err: Error) => {
            return res.status(500).json({
                msg: 'Error en el guardado de los datos.',
                error: err
            })
        })

}



// funcion para actualizar por id
export function update(req: Request, res: Response) {
    //PARAMS BODY
    //tenemos que usar el params y el body
    const id = req.params.id;
    // desestructuramos el body
    const { nombre, email, username } = req.body;
    // actualizamos el usuario de la lista , convertimos el id a numero
    usuarioService.update(Number(id), nombre, email, username)
        //ojo con el casteo se pone any por que no se podia castear a UsuarioModel[]
        .then((actualizados: [number, any]) => {
            const [filas, _] = actualizados
            if (filas === 0) {
                return res.status(404).json({ msg: `No se ha encontrado el usuario con el id ${id}` })
            }
            return res.json({ msg: 'Datos actualizados correctamente' })
        })
        // controlamos el error
        .catch((err: Error) => {
            return res.status(500).json({
                msg: 'Error en la actualización de los datos.',
                error: err
            })
        })
    //response.status(501).send("Este método no está implementando, prueba más tarde")
}


// funcion para eliminar usuarios por id
export function remove(req: Request, res: Response) {
    let id = req.params.id;
    usuarioService.removeOneById(Number(id))
        .then((num: Number) => {
            // si el num es igual a 0 mostramos mensaje de error
            if (num === 0) {
                return res.status(404).json({
                    msg: `El usuario con el id: ${id} no se ha encontrado!!`
                })
            }
            // en caso de no error mostramos msg informando que se ha eliminado el usuario
            return res.json({
                msg: `El usuario con el id: ${id} ha sido eliminado!!`
            })
        })
        // controlamos el error
        .catch((err: Error) => {
            return res.status(500).json({
                msg: 'Error en la información de los datos.',
                error: err
            })
        });
}

// funcion para cambiar rol
export function  changeToAdmin(req: Request, res: Response) {
    const id = req.params.idUsuario;
    usuarioService.changeToAdmin(id)
        .then(() => {
            res.json({ msg: "Usuario actualizado a Admin" })
        })
        .catch((err: Error) => {
            return res.status(500).json({
                msg: 'Error en la actualización de los datos.',
                error: err
            })
        })
}


// promesa funcion que promete devolver un resultado. Asincrona
//el reultado correcto se utiliza .then() y para error .catch()