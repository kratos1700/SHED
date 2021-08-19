import { Request, Response } from 'express';
import { HorasService } from '../service/horas.service';

import { HoraModel } from '../models/hora.model';

const horasService = new HorasService
/**
 * FUNCION OBTENER HORAS EXTRA
 * @param req 
 * @param res 
 */
export const findAll = (__: Request, res: Response) => {

    horasService.findAll()
    .then((horas:HoraModel[])=>{
        return  res.json({
            horas
        })
    }
    )
    
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

    const { id } = req.params;
    //al desestructurar datos se pueden poner alias poniendo : y el nombre que queramos
    const {  dia, hores,dieta,observaciones,pendent,cobrat
    } = req.body;
   
    let idUser : number = parseInt  (id);
    console.log(idUser, id);
   
    // comprobamos que los datos que pedimos esten rellenados 
    if (dia === undefined || hores === undefined || dieta === undefined || observaciones === undefined
        || pendent === undefined || cobrat === undefined ) {
        return res.status(400).json({
            msg: 'Revisa los datos enviados.' })  }
    //guardamos el articulo
   return horasService.save( dia, hores,dieta,observaciones,pendent,cobrat,idUser)
        .then((hora: HoraModel) => {
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

    
     //PARAMS BODY
    //tenemos que usar el params y el body
    const id = req.params.id;
    // desestructuramos el body
    const { dia, hores,dieta,observaciones,pendent,cobrat} = req.body;
    // actualizamos el usuario de la lista , convertimos el id a numero
    horasService.update(Number(id),  dia, hores,dieta,observaciones,pendent,cobrat
    )
    //ojo con el casteo se pone any por que no se podia castear a UsuarioModel[]
        .then((actualizados: [number, any]) => {
            const [filas, _] = actualizados
            if (filas === 0) {
                return res.status(404).json({ msg: `No se ha encontrado el articulo con el id ${id}` })
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
export const deleteHora = (req: Request, res: Response) => {

    const { id } = req.params;

    res.json({
        msg: 'deleteUsuario',
        id
    })
}