import Joi from "joi";

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .messages({
      "string.email": "Email must be valid",
      "string.empty": "Email is required",
    })
    .required(),
  password: Joi.string()
    .min(1)
    .messages({
      "string.empty": "Password is required",
    })
    .required(),
});

const loginValidation = user => {
  return loginSchema.validate(user, { abortEarly: false });
};

export default loginValidation;
