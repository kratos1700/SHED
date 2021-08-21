import { Dieta,DietaModel  } from "../models/dieta.model";

export class DietasService {

    findAll(idUsuario:number): Promise<DietaModel[]> {
        return Dieta.findAll({where:{idUsuario}})

    }

    findOneById(id: number): Promise<DietaModel | null> {
        return Dieta.findByPk(id)
    }

    //funcion para eliminar  por id
    delete(id:number,idUsuario:number):Promise<Number>{
        return Dieta.destroy({where:{idUsuario,id}});
    }



    save(dia:Date, hores: number,tipoDieta: string, 
        observaciones: string,  pendent: boolean,  cobrat: boolean,idUsuario:number) {
        return Dieta.create({
            dia, hores,tipoDieta,observaciones,pendent,cobrat,idUsuario
        })
    }

     // funcion para actualizar usuarios por id
   update (id:number,dia:Date,hores: number, tipoDieta: string, 
    observaciones: string,  pendent: boolean,  cobrat: boolean,idUsuario:number){// se le pasan los elementos a actualizar i la condicion en este caso por id
    
    return  Dieta.update({
        dia,hores, tipoDieta,observaciones,pendent,cobrat  
    }, {where:{idUsuario,id}})
   
   }
}