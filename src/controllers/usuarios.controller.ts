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
export const getUsuario = async(req: Request, res: Response)=>{

    const {id} = req.params;
    
    const usuario= await Usuario.findById(id)
        
   if(usuario !== null){
    res.json({
        usuario,
        id
    })

   }else{
    res.status(404).json({
        result: 'Error',
        msg: `El usuario con el id: ${id} no se ha encontrado!!`
    })
   }

    
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
export const putUsuario = async(req: Request, res: Response)=>{
    
   
    

 // enviamos algun parametro 
 const { id } = req.params;
 // extraemos lo que no dejamos actualizar

 const { _id, password, google, correo, ...otrasPropiedades } = req.body;
 //let dataActualizacio = new Date(Date.now());
 
 
 //TODO validar contra bd
 if (password) {
     // salt es el numero de vueltas de codificacion defecto 10
     const salt = bcrypt.genSaltSync(15);
     // le pasamos el password desestructurado del body y el num vueltas salt
     otrasPropiedades.password = bcrypt.hashSync(password, salt);
 }

 // actualiza el usuario buscado por id y lo guarda a la constante usuario
 const usuario = await Usuario.findByIdAndUpdate(id,otrasPropiedades);
 
 
 //console.log('la data es: '+dataActualizacio);
 

    res.status(200).json({
        
        msg: 'Usuario actualizado',
        id,
        usuario
        
    })
}

/**
 * FUNCION PARA BORRAR USUARIOS
 * @param req 
 * @param res 
 */
export const deleteUsuario = async(req: Request, res: Response)=>{
    
    const {id} = req.params;



    // lo borramos fisicamente. no se aconseja de hacerlo ya que podemos perder integridad db
    //const usuario = await Usuario.findByIdAndDelete(id);

    // buscamos el usuario por id y lo eliminamos modificando el estado a false
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.status(200).json({

        msg: 'Usuario eliminado',
        id,
        usuario
    })
}


/**
 * FUNCION OBTENER USUARIOS ELIMINADO
 * @param req 
 * @param res 
 */
export const getUsuariosDelete = async(req: Request, res: Response)=>{

// destructuramos el limete para mostrar los registros
const { limite = 5, desde = 0 } = req.query;

// para mostrar los usuarios activos. Los registros no se borran de la bbd
// se cambian la bandera
const query = { estado: false };

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