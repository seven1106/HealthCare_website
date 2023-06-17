import e from "express";
import db from "../models/index";
import bcrypt from "bcryptjs";
var salt = bcrypt.genSaltSync(10);
let handleUserLogin = async (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);
      if (isExist) {
        // User already exist
        let user = await db.User.findOne({
          attributes: ["email", "roleId", "password", "firstName", "lastName"],
          where: { email: email },
          raw: true,
        });
        if (user) {
          // Compare password
          let check = await bcrypt.compareSync(password, user.password);
          if (check) {
            userData.errCode = 0;
            userData.errMessage = "Ok";
            userData.user = user;
            delete user.password;
          } else {
            userData.errCode = 3;
            userData.errMessage = "Wrong password";
          }
        }
      } else {
        // User not exist
        userData.errCode = 2;
        userData.errMessage = `Your's Email isn't exist in your system. Please try other email!`;
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};
let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getAllUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userId === "ALL") {
        users = await db.User.findAll({
          attributes: {
            exclude: ["password"],
          },
        });
      }
      if (userId && userId !== "ALL") {
        users = await db.User.findOne({
          where: { id: userId },
          attributes: {
            exclude: ["password"],
          },
        });
      }
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};
let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (error) {
      reject(error);
    }
  });
};
let createNewUser = (user) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkUserEmail(user.email);
      if (check === true) {
        resolve({
          errCode: 1,
          errMessage:
            "Your's Email already exist in your system. Please try other email!",
        });
      }
      let hashPasswordFromBcrypt = await hashUserPassword(user.password);
      await db.User.create({
        email: user.email,
        password: hashPasswordFromBcrypt,
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        gender: user.gender === "1" ? true : false,
        phoneNumber: user.phoneNumber,
        roleId: user.roleId,
      });
      resolve({
        errCode: 0,
        message: "Create new user success",
      });
    } catch (error) {
      reject(error);
    }
  });
};
let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Missing required parameter",
        });
      }
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        user.phoneNumber = data.phoneNumber;

        await user.save();
        resolve({
          errCode: 0,
          message: "Update user success",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "User not found",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let deleteUserById = (userId) => {
  return new Promise(async (resolve, reject) => {
    let user = await db.User.findOne({
      where: { id: userId },
    });
    if (user) {
      await user.destroy();
      // await db.User.destroy(
      //   {
      //     where: { id: userId },
      //   },
      // );

      resolve({
        errCode: 0,
        message: "Delete user success",
      });
    } else {
      resolve({
        errCode: 1,
        errMessage: "User not found",
      });
    }
  });
};


module.exports = {
  handleUserLogin: handleUserLogin,
  getAllUser: getAllUser,
  createNewUser: createNewUser,
  updateUserData: updateUserData,
  deleteUserById: deleteUserById,
};
