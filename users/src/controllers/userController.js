const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async(req, res) => {
    try {
        const { username, email, password, role } = req.body;

        const findUsername = await UserModel.findOne({ username }).lean();

        if (findUsername) {
            return res.json({
                statusCode: 409,
                statusText: "Conflict",
                message: "This username has been registered"
            })
            .status(409);
        }

        const newUser = await UserModel.create({ username, email, password, role });

        if (newUser) {
            res.json({
                statusCode: 200,
                statusText: "success",
                message: "User registered"
            })
            .status(200);
        }

    } catch (error) {
        res.json({
            statusCode: 500,
            statusText: "error",
            message: error.message
        })
        .status(500);
    }
};

const signin = async(req, res) => {
    try {
        const { username, password } = req.body;

        const findUser = await UserModel.findOne({ username }).lean();

        if (!findUser) {
            return res.json({
                statusCode: 400,
                statusText: "Not Found",
                message: "User not found"
            })
            .status(400);
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            findUser.password
        );

        if (isPasswordCorrect) {
            const payload = {
                username: findUser.username,
                email: findUser.email,
                role: findUser.role,
            };

            jwt.sign(
                payload,
                process.env.KEY_SECRET,
                {
                    expiresIn: "30d"
                },
                (err, token) => {
                    res.json({
                        statusCode: 200,
                        statusText: "success",
                        data: payload,
                        token: "Bearer token: " + token
                    })
                    .status(200);
                }
            )
        } else {
            res.json({
              status: 500,
              message: {
                password: "password didn't match",
              },
              data: [],
            })
            .status(500);
          }

    } catch (error) {
        res.json({
            statusCode: 500,
            statusText: "error",
            message: error.message
        })
        .status(500);
    }
};

const updateUser = async(req, res) => {
    try {
        const data = await UserModel.findOne({ _id: req.params.id }).lean();
        const newData = req.body;

        const updatedUser = await UserModel.findOneAndUpdate(
            { _id: req.params.id },
            newData,
            { new: true }
        ).lean();

        res.send({
            statusCode: 200,
            statusText: "success",
            messages: updatedUser
        })
        .status(200);

    } catch (error) {
        res.json({
            statusCode: 500,
            statusText: "error",
            message: error.message
        })
        .status(500);
    }
};

const deleteUser = async(req, res) => {
    try {
        const deletedUser = await UserModel.findByIdAndRemove({ _id: req.params.id }).lean();

        if (deletedUser) {
            const resPayload = {
                statusCode: 204,
                statusText: "No Content",
                message: "User is deleted"
            }

            res.json(resPayload).status(204);
        }

    } catch (error) {
        res.json({
            statusCode: 500,
            statusText: "error",
            message: error.message
        })
        .status(500);
    }
}

module.exports = { register, signin, updateUser, deleteUser };