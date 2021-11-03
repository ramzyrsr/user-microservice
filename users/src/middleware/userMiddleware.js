const Joi = require("joi");

const login = async (req, res, next) => {
  const { username, password } = req.body;
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }).options({
    abortEarly: false,
  });

  const validate = schema.validate({
    username,
    password,
  });

  if (validate.error) {
    res.status(422).send({
      status: 422,
      message: "data is not complete",
      data: validate.error.details,
    });
  } else {
    next();
  }
};

const register = async (req, res, next) => {
  const {
    username,
    email,
    password,
  } = req.body;

  const schema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .required()
      .min(8)
      .max(16)
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/), //number/capital
    // .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/), //number/capital//special

  }).options({
    abortEarly: false,
  });

  const validate = schema.validate({
    username,
    email,
    password,
  });

  if (validate.error) {
    res.status(422).send({
      status: 422,
      message: "data is not complete",
      data: validate.error.details,
    });
  } else {
    next();
  }
};

const profileEdit = async (req, res, next) => {
  const { username, email, password, role } = req.body;

  const schema = Joi.object({
    username: Joi.string().optional(),
    password: Joi.string()
      .optional()
      .min(8)
      .max(16)
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/),
  }).options({
    abortEarly: false,
  });

  const validate = schema.validate({
    username,
    password,
  });

  if (validate.error) {
    res.status(422).send({
      status: 422,
      message: "data is not complete",
      data: validate.error.details,
    });
  } else {
    next();
  }
};

module.exports = {
  login,
  register,
  profileEdit,
};