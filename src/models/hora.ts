import * as Sequelize from "sequelize";


import {sqlite} from "../database/sqlite";



export interface HoraModel extends Sequelize.Model {
    id: number,
    dia:Date,
    hores: number,
    dieta: boolean,
    observaciones: string,
    pendent: boolean, // 
    cobrat: boolean, // 
    idUser: number, //
    


}


export interface NewHoraModel {
    id?: number;
    dia:Date,
    hores: number,
    dieta: boolean,
    observaciones: string,
    pendent: boolean, // 
    cobrat: boolean, // 
    idUser: number, //
}



//definicion esquema de la bbdd

export const Hora = sqlite.define<HoraModel, NewHoraModel>('hores', {
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
  
    dieta: {
        type: Sequelize.BOOLEAN,
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