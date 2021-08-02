import {Request, Response} from 'express';
import bcrypt from "bcrypt";
// importamos el modelo usuario
const Usuario = require('../models/usuario');

/**
 * FUNCION OBTENER USUARIOS
 * @param req 
 * @param res 
 */
export const getUsuarios = async(req: Request, res: Response)=>{


// destructuramos el limete para mostrar los registros
const { limite = 5, desde = 0 } = req.query;

// para mostrar los usuarios activos. Los registros no se borran de la bbd
// se cambian la bandera
const query = { estado: true };

/*
    PAGINACION DE REGISTROS
*/

// recuperamos todos los usuarios de la base de datos
// para evitar tiempos de espera elevados creamos una coleccion de promesas.
// se ejecutan las dos a la vez y si una falla , fallan todas
const [total, usuarios] = await Promise.all([
    // se le pasa el query para que muestre solo el estado a true y no conte los false
    Usuario.countDocuments(query),
    Usuario.find(query)
        //Para mostrar del n al limit
        .skip(Number(desde))
        // con .limit(n) muestra los n primeros registros. 
        //Para castear a numero ponemos Number(String)  
        .limit(Number(limite))

])

res.json({
    total,
    //totalRegistros,
    // retornamos todos los usuarios
    usuarios
});


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
export const postUsuario = async (req: Request, res: Response)=>{
    
   //desestructurando el body podemos seleccionar que datos queremos
   const { nombre, correo, password, nickname, rol } = req.body;
   // instanciamos  usuario pasando los datos enviados por el body
   // si no hay los campos en el modelo mongoose los ignora
   const usuario = new Usuario({ nombre, correo, password, nickname, rol });
   // encriptar password
   // salt es el numero de vueltas de codificacion defecto 10
   const salt = bcrypt.genSaltSync(15);
   // le pasamos el password desestructurado del body y el num vueltas salt
   usuario.password = bcrypt.hashSync(password, salt);


   // guarda el usuario a la bbd
   await usuario.save();

   // .status especificamos el resultado
   res.status(201).json({
       msg: 'Post API - controlador',
       usuario
   });
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