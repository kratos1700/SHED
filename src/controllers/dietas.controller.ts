import {Request, Response} from 'express';

/**
 * FUNCION OBTENER DIETAS
 * @param req 
 * @param res 
 */
export const getDietas = (__: Request, res: Response)=>{

    res.json({
        msg: 'getDietas'
    })
}

/**
 * 
 * @param req FUNCION OBTENER DIETAS POR ID
 * @param res 
 */
export const getDieta = (req: Request, res: Response)=>{

    const {id} = req.params;
    res.json({
        msg: 'getDieta',
        id
    })
}

/**
 * FUNCION PARA CREAR LA DIETA
 * @param req 
 * @param res 
 */
export const postDieta = (req: Request, res: Response)=>{
    
    const {body} = req;
    res.json({
        msg: 'postDieta',
        body
    })
}

/**
 * 
 * @param req FUNCION PARA ACTUALIZAR LA DIETA
 * @param res 
 */
export const putDieta = (req: Request, res: Response)=>{
    
    const {id} = req.params;
    const {body} = req;
    res.json({
        msg: 'putDieta',
        body,
        id
    })
}

/**
 * FUNCION PARA BORRAR LA DIETA
 * @param req 
 * @param res 
 */
export const deleteDieta = (req: Request, res: Response)=>{
    
    const {id} = req.params;
    
    res.json({
        msg: 'deleteDieta',
        id
    })
}