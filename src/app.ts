import dotenv from 'dotenv';
import Server from './models/server';
// configuracion de las variables 
dotenv.config();
// instanciamos el server
const server = new Server();

// arrancamos el server
server.listen();