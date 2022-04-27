const dotenv = require("dotenv")
dotenv.config({path: `./env.${process.env.NODE_ENV}`});
module.exports = {
    PORT: process.env.PORT || 8000,
    // MONGODB_URL : process.env.MONGODB_URL || "mongodb+srv://VimalRaj:ThalaVR003@cluster0.1b2f5.mongodb.net/CMS",
    MONGODB_URL : process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/SMS",

//  'mongodb://VimalRaj:ThalaVR003@cluster0-shard-00-00.bbnwa.mongodb.net:27017,cluster0-shard-00-01.bbnwa.mongodb.net:27017,cluster0-shard-00-02.bbnwa.mongodb.net:27017/test?ssl=true&replicaSet=atlas-12egjt-shard-0&authSource=admin&retryWrites=true&w=majority',
    JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret'
}