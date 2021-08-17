import * as Sequelize from "sequelize";

import {sqlite} from "../database/sqlite";

export interface ArticuloModel extends Sequelize.Model {
    id: number;
    nombre: string;
    descripcion: string,
    stock: number,
    observaciones: string,
    referencia: string, // codigo de barras
    precio: number,
    categoria: string,
    peso: number,
    consumible: boolean,
    foto: string //URL


}


export interface NewArticuloModel {
    id?: number;
    nombre: string;
    descripcion: string,
    stock: number,
    observaciones?: string,
    referencia: string, // codigo de barras
    precio: number,
    categoria: string,
    peso: number,
    consumible?: boolean,
    foto: string //URL
}


//definicion esquema de la bbdd

export const Articulo = sqlite.define<ArticuloModel, NewArticuloModel>('articulos', {
    id: {
        // especificamos el tipo de dato
        type: Sequelize.INTEGER,
        //decimos k es la pk
        primaryKey: true,
        // autoincremento
        autoIncrement: true
    },
    nombre: {
        type: Sequelize.STRING,
        //no puede ser nulo
        allowNull: false
    },
    descripcion: {
        type: Sequelize.STRING,
        //no puede ser nulo
        allowNull: false
    },
    stock: {
        type: Sequelize.INTEGER,
        //no puede ser nulo
        allowNull: false
    },
    observaciones: {
        type: Sequelize.STRING,
        //no puede ser nulo
        allowNull: true // opcional
    },
    referencia: {
        type: Sequelize.STRING,
        //no puede ser nulo
        allowNull: false
    },
    precio: {
        type: Sequelize.FLOAT,
        //no puede ser nulo
        allowNull: false
    },
    categoria: {
        type: Sequelize.STRING,
        //no puede ser nulo
        allowNull: false
    },
    peso: {
        type: Sequelize.FLOAT,
        //no puede ser nulo
        allowNull: false
    },
    consumible: {
        type: Sequelize.BOOLEAN,
        //no puede ser nulo
        defaultValue: false
    },
    foto: {
        type: Sequelize.STRING,
        //no puede ser nulo
        allowNull: false
    }


}, { underscored: true, timestamps: true })



