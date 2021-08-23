import { Request, Response } from 'express';
import { DietasService } from '../service/dietas.service';

//import { HoraModel } from '../models/hora.model';
import config from '../settings/config';
import { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import * as jwt from "jsonwebtoken";

const dietasService = new DietasService
/**
 * FUNCION OBTENER HORAS EXTRA
 * @param req 
 * @param res 
 */
export const findAll = (req: Request, res: Response) => {

    
  //recuperar token
  let token: string | undefined = req.get('Authorization')
  console.log(token);
  if (token == undefined) {
      return res.status(401).json({ msg: "No se ha encontrado ningún token" })
  }
  return jwt.verify(token, String(config.jwt.clave), (err: VerifyErrors | null, payload: JwtPayload | undefined) => {
      if (err) {
          console.log(err);
          return res.status(401).json({ msg: "Token invalido" }) //<-- al ver un return salimos de la función
      }
      
      //IS ADMIN
      if (payload) {
          return dietasService.findAll((payload.id))!
              .then(dietas => {
                  return res.json({
                      dietas
                      
                  })
              })
              .catch((err: Error) => {
                  //lanzamos un error de servicio
                  return res.status(500).json({
                      msg: 'Error en la recuperacion de los datos ',
                      error: err
                  })
              })
      }
      else

          return res.status(401).json({ msg: "Token invalido" }) //<-- al ver un return salimos de la función

  })
    
}

/**
 * 
 * @param req FUNCION OBTENER USUARIO POR ID
 * @param res 
 */
export const getHora = (req: Request, res: Response) => {

    const { id } = req.params;
    res.json({
        msg: 'getHora',
        id
    })
}

/**
 * FUNCION PARA CREAR EL USUARIO
 * @param req 
 * @param res 
 */
export const save = (req: Request, res: Response) => {

    const idUsuario = req.params.idUsuario


   // const { id } = req.params;
    //al desestructurar datos se pueden poner alias poniendo : y el nombre que queramos
    const {  dia, hores,tipoDieta,observaciones,pendent,cobrat
    } = req.body;
   
    
    console.log(idUsuario);

   
    // comprobamos que los datos que pedimos esten rellenados 
    if (dia == undefined  || idUsuario == undefined || idUsuario == ''
    ||  hores== undefined || hores=='' || 
    observaciones==undefined || observaciones=='') {
    
        return res.status(500).json({
        msg: 'Error en los datos a enviar '

    })

} 

   
    //guardamos el articulo
   return dietasService.save( dia, hores,tipoDieta,observaciones,pendent,cobrat,Number (idUsuario))
        .then(hora => {
            return res.json({ hora })
            
        })
        
        // controlamos el error
        .catch((err: Error) => {
            return res.status(500).json({
                msg: 'Error en el guardado de los datos.',
                error: err
            })
            
        })

        

}

/**
 * 
 * @param req FUNCION PARA ACTUALIZAR EL USUARIO
 * @param res 
 */
export const update = (req: Request, res: Response) => {

    const idUsuario = req.params.idUsuario
    const id = req.params.id
     //PARAMS BODY
    //tenemos que usar el params y el body
   
    // desestructuramos el body
    const {dia, hores,tipoDieta,observaciones,pendent,cobrat} = req.body;

     if (dia == undefined   ||  hores== undefined || hores=='' || 
    observaciones==undefined || observaciones=='') { 
    
        return res.status(500).json({
        msg: 'Error en los datos a enviar '

    })
}

    // actualizamos el usuario de la lista , convertimos el id a numero
 return   dietasService.update(Number(id),  dia, hores,tipoDieta,observaciones,pendent,cobrat,Number(idUsuario)
    )
    //ojo con el casteo se pone any por que no se podia castear a UsuarioModel[]
        .then((actualizados: [number, any]) => {
            const [filas, _] = actualizados
            if (filas === 0) {
                return res.status(404).json({ msg: `No se ha encontrado el registro con el id ${id}` })
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

}

/**
 * FUNCION PARA BORRAR USUARIOS
 * @param req 
 * @param res 
 */
export const remove = (req: Request, res: Response) => {

    const id =req.params.id;

     //de los parametros que nos llegan obtenemos el id
     const idUsuario = req.params.idUsuario

     console.log(id);
     
     dietasService.delete(parseInt(id),Number(idUsuario))
         .then((num: Number) => {
             // si el num es igual a 0 mostramos mensaje de error
             if (num === 0) {
                 return res.status(404).json({
                     msg: `El registro con el id: ${idUsuario} no se ha encontrado!!`
                 })
             }
             // en caso de no error mostramos msg informando que se ha eliminado el usuario
             return res.json({
                 msg: `El registro  con id: ${id} del usuario con el id: ${idUsuario} ha sido eliminada!!`
             })
         })
 
         .catch((err: Error) => {
             //lanzamos un error de servicio
             return res.status(500).json({
                 msg: 'Error en la eliminacion de los datos ',
                 error: err
             })
         })
}