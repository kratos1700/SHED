import { Sequelize } from "sequelize";


//CONFIGURACION DE LA BBDD
export const sqlite:Sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db/shed.sqlite3'
}
);
    