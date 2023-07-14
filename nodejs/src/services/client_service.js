import e from "express";
import db from "../models";
import _ from "lodash";
require("dotenv").config();
let postBookAppointment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.email || !data.doctorId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        let user = await db.User.findOrCreate({
          where: { email: data.email },
          defaults: {
            email: data.email,
            roleId: "R3",
          },
        });
        console.log("check use", user);
        if (user && user[0]) {
          await db.booking.findOrCreate({
            where: {
              clientId: user[0].id,
            },
            defaults: {
              statusId: "S1",
              doctorId: data.doctorId,
              date: data.date,
              timeType: data.timeType,
              clientId: user[0].id,
            },
          });
          resolve({
            errCode: 0,
            errMessage: "Book appointment success!",
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "Cannot find user!",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  postBookAppointment: postBookAppointment,
};
