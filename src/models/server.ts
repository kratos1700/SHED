/**
 * CLASE SERVER
 */

import express, {Application} from 'express';

class Server {

    //  declaramos los atributos
    private app:Application;
    private port:string;

    constructor(){
        this.app = express();
        this.port = process.env.PORT ||'8000';

    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor escuchando por el puerto: ', this.port);
            
        });

    }

}
export default Server;