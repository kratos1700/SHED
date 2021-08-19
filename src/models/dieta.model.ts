import * as Sequelize from "sequelize";
import { Usuario } from "../models/usuario.model";

import {sqlite} from "../database/sqlite";


export interface DietaModel extends Sequelize.Model {
    id: number,
    dia:Date,
    hores: number,
    tipoDieta: EnumTiposDieta,
    observaciones: string,
    pendent: boolean, // 
    cobrat: boolean, // 
    idUser: number, //
    


}

export enum EnumTiposDieta {
    MITJA = 0,
    CENCERA = 1

}


export interface NewDietaModel {
    id?: number;
    dia:Date,
    hores: number,
    tipoDieta: EnumTiposDieta,
    observaciones: string,
    pendent: boolean, // 
    cobrat: boolean, // 
    idUser: number, //
}



//definicion esquema de la bbdd

export const Dieta = sqlite.define<DietaModel, NewDietaModel>('dietas', {
    id: {
        // especificamos el tipo de dato
        type: Sequelize.INTEGER,
        //decimos k es la pk
        primaryKey: true,
        // autoincremento
        autoIncrement: true
    },


    dia: {
        type: Sequelize.DATE,
        //no puede ser nulo
        allowNull: false
    },

    hores: {
        type: Sequelize.NUMBER,
        //no puede ser nulo
        allowNull: false
    },
   
    tipoDieta: {
        type: Sequelize.STRING,
        //no puede ser nulo
        allowNull: false
    },
    observaciones: {
        type: Sequelize.STRING,
        //no puede ser nulo
        allowNull: true // opcional
    },
    pendent: {
        type: Sequelize.BOOLEAN,
        //no puede ser nulo
        allowNull: false
    },
    cobrat: {
        type: Sequelize.BOOLEAN,
        //no puede ser nulo
        allowNull: false
    },
    idUser: {
        type: Sequelize.NUMBER,
        //no puede ser nulo
        allowNull: false
    }


}, { underscored: true, timestamps: true })
