import { Request, Response } from 'express';

/**
 * FUNCION OBTENER HORAS EXTRA
 * @param req 
 * @param res 
 */
export const getHoras = (__: Request, res: Response) => {

    res.json({
        msg: 'getHoras'
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
export const postHora = (req: Request, res: Response) => {

    const { body } = req;
    res.json({
        msg: 'postHora',
        body
    })
}

/**
 * 
 * @param req FUNCION PARA ACTUALIZAR EL USUARIO
 * @param res 
 */
export const putHora = (req: Request, res: Response) => {

    const { id } = req.params;
    const { body } = req;
    res.json({
        msg: 'putHora',
        body,
        id
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