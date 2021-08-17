/**
 * ARCHIVO PARA LAS FUNCIONES DE LOS ARTICULOS
 * 
 */


import { Request, Response } from "express";
import { ArticuloModel } from "../models/articulo.model";
import { ArticulosService } from "../service/articulos.service";

const articuloService = new ArticulosService();
//  funcion de mostrar todos los articulos
export function findAll(_: Request, res: Response) {
    articuloService.findAll()
        .then((articulos: ArticuloModel[]) => {
            return res.json({ articulos })
        })
        .catch((err: Error) => {
            //lanzamos un error de servicio
            return res.status(500).json({
                msg: 'Error en la recuperacion de los datos ',
                error: err
            })
        })
}

export function findOneById(req: Request, res: Response) {
    const id = req.params.id;

    articuloService.findOneById(Number(id))
    .then((articulo: ArticuloModel | null) => {

        // mostramos un mensaje de id no encontrado
        if (articulo === null) {
            //mandamos un error de recurso no encontrado
            res.status(404).json({
                result: 'Error',
                msg: `El articulo con el id: ${id} no se ha encontrado!!`
            })
        }
        return res.json({ articulo })
    })
    .catch((err: Error) => {
        //lanzamos un error de servicio
        return res.status(500).json({
            msg: 'Error en la recuperacion de los datos ',
            error: err
        })
    })
}


export function update(req: Request, res: Response) {

     //PARAMS BODY
    //tenemos que usar el params y el body
    const id = req.params.id;
    // desestructuramos el body
    const { nombre, descripcion, stock, referencia, precio, categoria, peso, foto
    } = req.body;
    // actualizamos el usuario de la lista , convertimos el id a numero
    articuloService.update(Number(id),  nombre, descripcion,stock,referencia,precio,categoria,peso,foto
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
export function save(req: Request, res: Response) {

    //al desestructurar datos se pueden poner alias poniendo : y el nombre que queramos

    const { nombre, descripcion, stock, referencia, precio, categoria, peso, foto
    } = req.body;

    // comprobamos que los datos que pedimos esten rellenados 
    if (nombre === undefined || descripcion === undefined || stock === undefined || referencia === undefined
        || precio === undefined || categoria === undefined || peso === undefined
        || foto === undefined) {
        return res.status(400).json({
            msg: 'Revisa los datos enviados.'
        })
    }
    //guardamos el articulo
   return articuloService.save(nombre, descripcion,
        stock, referencia, precio, categoria, peso, foto)
        .then((artiticulo: ArticuloModel) => {
            return res.json({ artiticulo })
        })
        // controlamos el error
        .catch((err: Error) => {
            return res.status(500).json({
                msg: 'Error en el guardado de los datos.',
                error: err
            })
        })
}

export function remove(req: Request, res: Response) { 

    let id = req.params.id;
    articuloService.removeOneById(Number(id))
        .then((num: Number) => {
            // si el num es igual a 0 mostramos mensaje de error
            if (num === 0) {
                return res.status(404).json({
                    msg: `El articulo con el id: ${id} no se ha encontrado!!`
                })
            }
            // en caso de no error mostramos msg informando que se ha eliminado el usuario
            return res.json({
                msg: `El articulo con el id: ${id} ha sido eliminado!!`
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
