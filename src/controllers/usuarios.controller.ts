import {Request, Response} from 'express';

/**
 * FUNCION OBTENER USUARIOS
 * @param req 
 * @param res 
 */
export const getUsuarios = (__: Request, res: Response)=>{

    res.json({
        msg: 'getUsuarios'
    })
}

/**
 * 
 * @param req FUNCION OBTENER USUARIO POR ID
 * @param res 
 */
export const getUsuario = (req: Request, res: Response)=>{

    const {id} = req.params;
    res.json({
        msg: 'getUsuario',
        id
    })
}

/**
 * FUNCION PARA CREAR EL USUARIO
 * @param req 
 * @param res 
 */
export const postUsuario = (req: Request, res: Response)=>{
    
    const {body} = req;
    res.json({
        msg: 'postUsuario',
        body
    })
}

/**
 * 
 * @param req FUNCION PARA ACTUALIZAR EL USUARIO
 * @param res 
 */
export const putUsuario = (req: Request, res: Response)=>{
    
    const {id} = req.params;
    const {body} = req;
    res.json({
        msg: 'putUsuario',
        body,
        id
    })
}

/**
 * FUNCION PARA BORRAR USUARIOS
 * @param req 
 * @param res 
 */
export const deleteUsuario = (req: Request, res: Response)=>{
    
    const {id} = req.params;
    
    res.json({
        msg: 'deleteUsuario',
        id
    })
}