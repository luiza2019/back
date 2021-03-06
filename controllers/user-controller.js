const ErrorHandler = require("./../utils/error-handler");
const UserService = require("./../services/user-service");
const { validationResult } = require("express-validator");

const signup = async (req, res, next) => {
  try {
    // const errors = validationResult(req);

    // if (!errors.isEmpty()) {
    //   return next(ErrorHandler.BadRequest("Validation error", errors.array()));
    // }
    const { email, password } = req.body;
    const userData = await UserService.signup(email, password);
    res.json(userData);
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userData = await UserService.login(email, password);
    res.json(userData);
  } catch (e) {
    next(e);
  }
};

const activate = async (req, res, next) => {
  try {
    const { link } = req.params;
    await UserService.activate(link);
    res.redirect("https://www.google.com");
  } catch (e) {
    next(e);
  }
};
const getAll = async (req, res, next) => {
  try {
    const { status } = req.query;
    const users = await UserService.getAll();
    res.json(users);
  } catch (e) {
    next(e);
  }
};

const refresh = async (req, res, next) => {
  try {
    const { refresh_token } = req.headers;
    const userData = await UserService.refresh(refresh_token);
    res.json(userData);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  signup,
  getAll,
  login,
  activate,
  refresh,
};
