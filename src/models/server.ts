/**
 * CLASE SERVER
 */

import express, {Application} from 'express';
import usuarioRutas from '../routes/usuario.routes';

class Server {

    //  declaramos los atributos
    private app:Application;
    private port:string;
    private apiPath ={
        usuarios : '/api/usuarios',

    }

    constructor(){
        this.app = express();
        this.port = process.env.PORT ||'8000';
        //define mis rutas
        this.routes();

    }


    routes(){
        this.app.use(this.apiPath.usuarios,usuarioRutas);

    }


    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor escuchando por el puerto: ', this.port);
            
        });

    }

}
export default Server;