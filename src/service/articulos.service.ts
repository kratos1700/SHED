import { Articulo, ArticuloModel } from "../models/articulo.model";

export class ArticulosService {

    findAll(): Promise<ArticuloModel[]> {
        return Articulo.findAll()

    }

    findOneById(id: number): Promise<ArticuloModel | null> {
        return Articulo.findByPk(id)
    }

    //funcion para eliminar un usuario por id
    removeOneById(id:number):Promise<Number>{
        return Articulo.destroy({where:{id}});
    }

    save(nombre: string, descripcion: string, stock: number, referencia: string, precio: number, categoria: string,
        peso: number, foto:string) {
        return Articulo.create({
            nombre, descripcion,stock,referencia,precio,categoria,peso,foto
        })
    }

     // funcion para actualizar usuarios por id
   update (id:number, nombre: string, descripcion: string, stock: number, referencia: string, precio: number, categoria: string,
   peso: number, foto:string){// se le pasan los elementos a actualizar i la condicion en este caso por id
    
    return  Articulo.update({
        nombre, descripcion,stock,referencia,precio,categoria,peso,foto   
    }, {where:{id}})
   
   }
}