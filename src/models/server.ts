/**
 * CLASE SERVER
 */
 

import express, {Application} from 'express';
import cors from 'cors';

import usuarioRutas from '../routes/usuario.routes';
import horasRutas from '../routes/horas.routes';
import dietasRutas from '../routes/dietas.routes';

import config from "../settings/config";
import { dbConnection } from '../database/config';

//import config from "../settings/config";


class Server {

    //  declaramos los atributos
    private app:Application;
    private port:string;
    private apiPath ={
        usuarios : '/api/usuarios',
        horas : '/api/horas',
        dietas : '/api/dietas'

    }

    constructor(){
        this.app = express();
        this.port = config.app.port;
        TODO: //mirar per que no funciona dins el middlewares
        
        // parseo y lectura de bodys. Es informacion recibida por un post
        this.app.use(express.json());
        //define mis rutas
        this.routes();
        // conectar a MongoDB
        this.conectarDB();

        //middlewares
        this.middlewares();



    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
       
        //CORS evita problemas en las peticiones
        this.app.use(cors());
        // parseo y lectura de bodys. Es informacion recibida por un post
        
    }

    routes(){
        this.app.use(this.apiPath.usuarios,usuarioRutas),
        this.app.use(this.apiPath.horas,horasRutas),
        this.app.use(this.apiPath.dietas,dietasRutas);

    }


    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor escuchando por el puerto: ', this.port);
            
        });

    }

}
export default Server;