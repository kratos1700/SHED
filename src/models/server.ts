/**
 * CLASE SERVER
 */
 

import express, {Application} from 'express';
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
        //define mis rutas
        this.routes();
        // conectar a MongoDB
        this.conectarDB();



    }

    async conectarDB(){
        await dbConnection();
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