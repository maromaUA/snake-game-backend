const {Schema, model} = require("mongoose");
const {handleMongooseError} =require("../helpers/handleMongooseError")
const Joi = require("joi");

const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const userSchema = new Schema({
    email:{
        type: String,
      required: [true, "Email is required"],
      match: emailPattern,
      unique: true,
    },
    password: {
        type: String,
        required: [true, "Set password for user"],
        minlength: 6,
      },
      name: {
        type: String,
        required: [true, "Name is required"],
      },
      record: {
        type: Number,
        default:0
      },
      token: String,  
})

const registrationSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().pattern(emailPattern).required(),
    name: Joi.string().required(),
  });
  const loginSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().pattern(emailPattern).required(),
  });

  
userSchema.post("save", handleMongooseError);
  const User = model("user", userSchema);

  module.exports = {
    registrationSchema,
    loginSchema,
    User
  }