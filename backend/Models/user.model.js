const Mongoose = require("mongoose");
const { roles } = require("../Config/roles");
const { USER } = require("../Contants");
const Schema = Mongoose.Schema;

module.exports = (sequelize) => {
const User = sequelize.define(
    USER, {
    user_name: {
        type: String,
    },
    user_avatar: {
        type: String,
        allowNull: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 10,
        validate(val) {
            if (!val.match(/\d/) || !val.match(/[a-zA-Z]/)) {
                throw new Error(
                  "Password must contain at least one letter and one number"
                );
              }
        }
    },
    role: {
        type: String,
        values: roles,
        default: 'customer',
    }

}, {
        collection: 'User'
});
User.sync();
return User
}
//  USER = Mongoose.model('User', UserSchema)