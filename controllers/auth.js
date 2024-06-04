const { User } = require("../models/user");
const { HttpError } = require("../helpers/HttpError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs/promises");
const { nanoid } = require("nanoid");
dotenv.config();
const { SECRET_KEY, BASE_URL } = process.env;

const registration = async (req, res, next) => {
    try {
      const { email, password, name } = req.body;
      const hashPassword = await bcrypt.hash(password, 10);
      const user = await User.findOne({ email });
      if (user) {
        throw HttpError(409, "Email is already in use");
      }
      const result = await User.create({
        ...req.body,
        password: hashPassword,
      });
      res.status(201).json({
        email: result.email,
        name: result.name,
      });
    } catch (error) {
      next(error);
    }
  };
  
  const login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        throw HttpError(401, "Invalid email or password");
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        throw HttpError(401, "Invalid email or password");
      }
      const payload = {
        id: user._id,
      };
      const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "22h" });
      await User.findByIdAndUpdate(user._id, { token }, { new: true });
      res.json({
        token,
        user: {
          email: user.email,
          name: user.name,
          record: user.record,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  const logout = async (req, res, next) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });
    res.status(204).json({
      message: "Logout succesfull",
    });
  };

  const getCurrent = async (req, res, next) => {
    const { email, name, record } = req.user;
    res.json({
      email,
      name,
      record
    });
  };

  const changeRecord = async (req, res, next) => {
    const {record} = req.body
    const {_id} = req.user;
    const user = await User.findByIdAndUpdate(_id, {record:record});
    res.json({
      record:user.record
    })
  }

  module.exports = {
    registration,
    login,
    logout,
    getCurrent,
    changeRecord,
  }