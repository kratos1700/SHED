import { Usuario } from "../models/usuario.model";
import {Hora} from "../models/hora.model";
import {Dieta} from "../models/dieta.model";


Usuario.hasMany(Hora, {as:"horas", foreignKey:"userId"})
Hora.belongsTo(Usuario, {as:"user"})



Usuario.hasMany(Dieta)
Dieta.belongsTo(Usuario)