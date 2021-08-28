/**
 * FUNCIONES DE ACCESO A LAS URL
 */

import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "../settings/config";
import { JwtPayload, VerifyErrors } from "jsonwebtoken";
import { EnumUsuarioRol } from "../models/usuario.model";

//funcion para comprobar si es admin
export function checkIsAdmin(req: Request, res: Response, next: NextFunction) {
    let token: string | undefined = req.get('Authorization') // el nombre es lo que le pasamos a postam el token
    console.log(token);
    if (token !== undefined) {

        return jwt.verify(token, String(config.jwt.clave),
            (err: VerifyErrors | null, usuario: JwtPayload | undefined) => {

                if (err) {
                    console.log(err);
                    return res.status(401).json({ msg: "token invalido" })
                }
                // comprobar si es usuario o admin

                if (usuario !== undefined) {

                    if (usuario.role === EnumUsuarioRol.ADMIN) {
                        return next();
                    } else {
                        return res.status(401).json({ msg: "Token invalido, El usuario no tiene permisos para usar el recurso" })
                    }

                }

                // comprobar fecha expiracion token

            })


    } else {
        return res.status(401).json({ msg: "No se ha encontrado el token" })

    }
}


//funcion comprobar rol usuarios
export function checkUser(req: Request, res: Response, next: NextFunction) {
    //recuperar token
    let token: string | undefined = req.get('Authorization')
    console.log(token);
    if (token == undefined) {
        return res.status(401).json({msg: "No se ha encontrado ningún token"})
    }
    return jwt.verify(token, String(config.jwt.clave), (err: VerifyErrors | null, payload: JwtPayload | undefined) => {
        if (err) {
            console.log(err);
            return res.status(401).json({msg: "Token invalido"}) //<-- al ver un return salimos de la función
        }
        //IS ADMIN
        if (payload) { //CHECK de payload !== undefined
            if (payload.role === EnumUsuarioRol.ADMIN ) {  //|| payload.role === EnumUsuarioRol.USER
                req.body.idUsuario = payload.id
                return next()
            }
            if (payload.id == req.params.idUsuario) {
                req.body.idUsuario = payload.id
                return next()
            }
            return res.status(401).json({msg: 'No tienes permisos'})
        } else {
            return res.status(401).json({msg: 'Token invalido'})
        }
    })

}




