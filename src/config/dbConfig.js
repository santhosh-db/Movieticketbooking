require ('dotenv').config();
const dbConfig={
    HOST:process.env.DB_HOST,
    USER:process.env.DB_USERNAME,
    PASSWORD:process.env.DB_PASSWORD,
    DATABASE:process.env.DB_NAME,
    DIALECT:process.env.DB_DIALECT
}
module.exports=dbConfig;