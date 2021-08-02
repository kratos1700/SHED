
import mongoose from 'mongoose';
import config from "../settings/config";
//require('dotenv').config();


export const dbConnection = async ()=>{
    try {
      await mongoose.connect(config.db.Uri!,{
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
          useFindAndModify: false 

      })
        console.log('Conectado a MongoDB');

    } catch (error) {
        console.log(error);
        
        throw new Error('Error al conectar a la BBDD');
    }

}

