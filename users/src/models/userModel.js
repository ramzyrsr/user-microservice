const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            set: encryptPassword
        },
        role: {
            type: String,
            required: true,
            enum: ['admin', 'user'],
            default: 'user'
        }
    },
    {
        timestamps: true
    }
);

function encryptPassword(password) {
    const encryptPassword = bcrypt.hashSync(password, 10);
    return encryptPassword;
}

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;