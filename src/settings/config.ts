import dotenv from 'dotenv'

dotenv.config();
// archivo configuracion de las varibles del server
 const config = {
    app:{
        port: process.env.PORT || '8001'
    },
    //variables de la base de datos Mongoo
    db:{
        Uri: process.env.MONGODB_CNN
    },
    jwt:{
        clave:process.env.TOKEN_CLAVE
    }
}
export default config;