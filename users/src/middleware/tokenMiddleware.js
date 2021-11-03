require("dotenv").config();
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const tokenAuth = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).send({
      status: 403,
      message: "missing token.",
    });
  }

  const schema = Joi.object({
    authorization: Joi.string().required(),
  }).options({
    abortEarly: false,
  });

  const validate = await schema.validate({
    authorization: token,
  });

  if (validate.error) {
    res.send({
      status: 500,
      message: "missing token.",
      data: validate.error.details,
    });
  } else {
    try {
      const decodeToken = await jwt.verify(
        token.replace("Bearer token: ", ""),
        process.env.KEY_SECRET
      );
      // console.log(decodeToken);
      req.user = decodeToken;
      if (req.user.role === "admin") {
        next();
      } else {
        throw err
      }
    } catch (err) {
    //   console.log(err);
      res.send({
        status: 500,
        message: "Token  not verified",
        data: [],
      });
    }
  }
};

module.exports = { tokenAuth };