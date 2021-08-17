/**
 * CONFIGURACION EXPRESS TYPESCRIPT
 */

import express, { NextFunction, Request, Response } from "express";
//import { mysql } from "./database/mysql";
import { Usuario } from "./models/usuario.model";
import UsuarioRoutes from './routes/usuarios.routes'
import LoginRouter from './routes/login.routes'
import ArticuloRoutes from './routes/articulos.routes'
import morgan from "morgan"

import config from "./settings/config";
//import { Articulo } from "./models/articulo.model";
import Log from "./settings/logger.winston";
import { sqlite } from "./database/sqlite";

class App {
    private app: express.Application;


    constructor() {
        this.app = express();

        this.settings();
        this.middlewares();
        this.routes();
        this.init();

    }
    private settings() {
        // propiedades necesarias a express
        this.app.set('port', config.app.port)

    }

    private middlewares() {
        // propiedades necesarias a las funciones middlewares

        
        this.app.use(morgan('dev'));
        //lo usamos para que el backend pueda leer el body de la peticion
        //transforma un boy a JSON
        this.app.use(express.json());
        // configurando carpeta publica para mostrar contenido estatico
        //  this.app.use(express.static('public'));

        /**
         * CONFIGURACION PARA RECIBIR PETICIONES DEL FRONTEND
         */
        this.app.use((_:Request, res:Response, next:NextFunction)=>{
            res.header('Access-Control-Allow-Origin','http://localhost:4200')
            res.header('Access-Control-Allow-Headers','Content-Type, Authorization')
            res.header('Access-Control-Allow-Methods','GET,POST,PUT,DELETE')
            next();
        })
    }

    private routes() {
        // propiedades necesarias las rutas
        this.app.use('/login', LoginRouter)
        this.app.use('/usuarios', UsuarioRoutes);

        this.app.use('/articulos', ArticuloRoutes);

        this.app.use('/dietas', ArticuloRoutes);
        this.app.use('/horas', ArticuloRoutes);

    }

    private init() {

        // conectamos a la base de datos del server
        sqlite.authenticate()
            // si no hay errores
            .then(() => {
            Log.info('DDBB Conectada!!')
                // fuerza crea tablas bbd, si existe la elimina .sync() crea la tabla, encaso de existir no hace nada ( video clase 7, 01:10:47)
                Usuario.sync({ })  // Usuario.sync({ force: true })
                    .then(() => console.log('Tabla usuarios creada correctamente!!'))
                    .catch((err: any) => console.log('No se ha podido crear la tabla!!! ERROR...' + err))
                // crea la tabla articulos
             //   Articulo.sync({ force: true })
             //       .then(() => console.log('Tabla articulos creada correctamente!!'))
             //       .catch((err: any) => console.log('No se ha podido crear la tabla articulos!!! ERROR...' + err))
 //COMENTADO PARA QUE NO SE ESTE CREANDO LA BBDD CADA VEZ K INICIAMOS EL SERVER

                //recuperamos el puerto establecido en el settings
                this.app.listen(this.app.get('port'), () => {
                    Log.info('Servidor escuchando por el puerto: ' + `${config.app.port}`);
                })
            })
            // si hay errores
            .catch(() => {
                
                Log.error('No hay acceso a la bbdd!!')
            })


    }
}

new App();