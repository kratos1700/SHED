//lista de usuarios

import { Usuario, UsuarioModel,EnumUsuarioRol } from "../models/usuario.model";

import bcrypt from "bcrypt";

//find, findOnById,update,delete,save

export class UsuarioService{
    //funcion buscar todos los usuario
    //devuelve una Promesa de una lista de Usuario model.
    // se puede ver si nos ponemos ancima el .findAll() del return
    findAll(): Promise<UsuarioModel[]> {
        return Usuario.findAll()
    }
    //funcion para buscar 1 usuario
    findOneById(id:number): Promise<UsuarioModel | null>{
       // la promesa puede devolver un usuario o un nulo si no lo encuentra
       return Usuario.findByPk(id)
    }
    //funcion para eliminar un usuario por id
    removeOneById(id:number):Promise<Number>{

        return Usuario.destroy({where:{id}});
    }

    save(nombre: string, email: string, password: string, username: string) {
        // encriptar pass
      const encryptPass=  bcrypt.hashSync(password, 12);

        
        return Usuario.create({
            // pasamos los atributos obligatorios 
            nombre, email, password:encryptPass, username
        })
    }

    // funcion para actualizar usuarios por id
   update(id:number, nombre:string, email:string, username:string):Promise<[number,any]>{
   // se le pasan los elementos a actualizar i la condicion en este caso por id
   return Usuario.update({nombre,email,username }, {where:{id}})
   
   
    }


    changeToAdmin(id: string) {
        return Usuario.update(
            {role:EnumUsuarioRol.ADMIN},
            {where:{id:id}}
        )

    }

}


