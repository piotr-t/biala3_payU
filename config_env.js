
const getEnv = () =>{
    //return "./.env"
    if( process.env.NODE_ENV === "development"){
      return "./.env.development"
    };
    if( process.env.NODE_ENV === "production"){
      return "./.env.production"
    }else{
      return "./.env"
    }
    
   }
   module.exports = getEnv;