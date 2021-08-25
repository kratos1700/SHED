import { Hora,HoraModel  } from "../models/hora.model";

export class HorasService {

    findAll(idUsuario:number): Promise<HoraModel[]> {
        return Hora.findAll({where:{idUsuario}})

    }
    findAllbyId(idUsuario:number): Promise<HoraModel[]> {
        return Hora.findAll({where:{idUsuario}})

    }

    findOneById(id: number): Promise<HoraModel | null> {
        return Hora.findByPk(id)
    }

    //funcion para eliminar  por id
    delete(id:number,idUsuario:number):Promise<Number>{
        return Hora.destroy({where:{idUsuario,id}});
    }



    save(dia:Date, hores: number,dieta: boolean, 
        observaciones: string,  pendent: boolean,  cobrat: boolean,idUsuario:number) {
        return Hora.create({
            dia, hores,dieta,observaciones,pendent,cobrat,idUsuario
        })
    }

     // funcion para actualizar usuarios por id
   update (id:number,dia:Date, hores: number,dieta: boolean, 
    observaciones: string,  pendent: boolean,  cobrat: boolean,idUsuario:number){// se le pasan los elementos a actualizar i la condicion en este caso por id
    
    return  Hora.update({
        dia, hores,dieta,observaciones,pendent,cobrat  
    }, {where:{idUsuario,id}})
   
   }
}