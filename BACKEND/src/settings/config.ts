import dotenv from 'dotenv'

dotenv.config();

// archivo configuracion de las varibles del server
 const config = {
    app:{
        port: process.env.SERVER_PORT || 3001
    },
    //variables de la base de datos
    db:{
        name: process.env.DB_NAME,
        

    },
    jwt:{
        clave:process.env.TOKEN_CLAVE
    }
}
export default config;