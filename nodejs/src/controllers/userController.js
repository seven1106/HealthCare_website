import userService from "../services/user_service";

const e = require("express");

let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing email or password",
    });
  }
  let userData = await userService.handleUserLogin(email, password);
  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};
let handleGetUser = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing required parameter",
    });
  }
  let userData = await userService.getAllUser(id);
  return res.status(200).json({
    errCode: 0,
    message: "Ok",
    userData,
  });
};
let handleCreateNewUser = async (req, res) => {
  let message = await userService.createNewUser(req.body);
  console.log(message);
  return res.status(200).json(message);
};
let handleEditUser = async (req, res) => {
  let data = req.body;
  let message = await userService.updateUserData(data);
  return res.status(200).json(message);
};
let handleDeleteUser = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing required parameter",
    });
  }
  let message = await userService.deleteUserById(id);
  return res.status(200).json(message);
};

module.exports = {
  handleLogin: handleLogin,
  handleGetUser: handleGetUser,
  handleCreateNewUser: handleCreateNewUser,
  handleEditUser: handleEditUser,
  handleDeleteUser: handleDeleteUser,
};
