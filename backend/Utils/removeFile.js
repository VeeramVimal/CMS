const fs = require('fs')
const httpStatus = require('http-status')
const ApiError = require('./ApiError')

const removeFile = async (file) => {
    console.log("removeFile==", file);
    if(file !== null){
        console.log(file, "=====file get===", file !== null, "");
        const response = await fs.unlink(file, ((res) => res))
        console.log("removeFile response===", response);
        return response
    }
    return null
}
module.exports =  removeFile