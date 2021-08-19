import { Hora,HoraModel  } from "../models/hora.model";

export class HorasService {

    findAll(): Promise<HoraModel[]> {
        return Hora.findAll()

    }

    findOneById(id: number): Promise<HoraModel | null> {
        return Hora.findByPk(id)
    }

    //funcion para eliminar un usuario por id
    removeOneById(id:number):Promise<Number>{
        return Hora.destroy({where:{id}});
    }



    save(dia:Date, hores: number,dieta: boolean, 
        observaciones: string,  pendent: boolean,  cobrat: boolean,idUser:number) {
        return Hora.create({
            dia, hores,dieta,observaciones,pendent,cobrat,idUser
        })
    }

     // funcion para actualizar usuarios por id
   update (id:number,dia:Date, hores: number,dieta: boolean, 
    observaciones: string,  pendent: boolean,  cobrat: boolean,){// se le pasan los elementos a actualizar i la condicion en este caso por id
    
    return  Hora.update({
        dia, hores,dieta,observaciones,pendent,cobrat  
    }, {where:{id}})
   
   }
}