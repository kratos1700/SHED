//interface usuario

import * as Sequelize from "sequelize";
import {Dieta} from "../models/dieta.model";
import {Hora} from "../models/hora.model";


import {sqlite} from "../database/sqlite";

export interface UsuarioModel extends Sequelize.Model {
    id: number;
    email: string;
    nombre: string;
    password: string;
    
    username: string;
    estado: boolean;
    role: EnumUsuarioRol;
    // emailConfirmado:number,
    resetPasswordToken: string | null;
    resetPasswordExpiress: string | null;


}

export enum EnumUsuarioRol {
    ADMIN = 0,
    USER = 1

}


export interface NewUsuarioModel {

    id?: number;
    email: string;
    nombre: string;
    password: string;
    
    username: string;
    estado?: boolean;
    role?: EnumUsuarioRol;
    resetPasswordToken?: string | null;
    resetPasswordExpiress?: string | null;


}
//definicion esquema de la bbdd
export const Usuario = sqlite.define<UsuarioModel, NewUsuarioModel>('usuarios',{
    id: {
        // especificamos el tipo de dato
        type: Sequelize.INTEGER,
        //decimos k es la pk
        primaryKey:true,
        // autoincremento
        autoIncrement:true
    },
    email: {
        type:Sequelize.STRING,
        //el emal es unico no puede haber repetidos
        unique:true,
        //no puede ser nulo
        allowNull:false
    },
    nombre: {
        type:Sequelize.STRING,
       //no puede ser nulo
       allowNull:false
    },
    password: {
        type:Sequelize.STRING,
        //no puede ser nulo
        allowNull:false
    },

    username: {
        type:Sequelize.STRING,
        //no puede ser nulo
        allowNull:false

    },
    estado: {
        type:Sequelize.BOOLEAN,
        //valor por defecto true
        defaultValue:true,
        //no puede ser nulo
        allowNull:false

    },
    role: {
        type:Sequelize.INTEGER,
        //valor por defecto user
        defaultValue:1,
        //no puede ser nulo
        allowNull:false

    },
    resetPasswordToken: {
        type:Sequelize.STRING,
        // puede ser nulo
        allowNull:true

    },
    resetPasswordExpiress: {
        type:Sequelize.STRING,
        // puede ser nulo
        allowNull:true
    }

//configuramos que las tablas se pongan _ en mysql y tiempos de creacion y  updates ..
}, {underscored:true, timestamps:true})

Usuario.hasMany(Hora)
Hora.belongsTo(Usuario)
Usuario.hasMany(Dieta)
Dieta.belongsTo(Usuario)

