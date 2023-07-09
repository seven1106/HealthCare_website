import db from "../models";
import _ from "lodash";
require("dotenv").config();

const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;
let getTopDoctorHome = (limitInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findAll({
        limit: limitInput,
        where: { roleId: "R2" },
        order: [["createdAt", "DESC"]],
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: db.allCode,
            as: "positionData",
            attributes: ["value_en", "value_vi"],
          },
          {
            model: db.allCode,
            as: "genderData",
            attributes: ["value_en", "value_vi"],
          },
        ],
      });
      resolve({
        errCode: 0,
        data: users,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let getAllDoctors = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let doctors = await db.User.findAll({
        where: { roleId: "R2" },
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: db.allCode,
            as: "positionData",
            attributes: ["value_en", "value_vi"],
          },
          {
            model: db.allCode,
            as: "genderData",
            attributes: ["value_en", "value_vi"],
          },
        ],
      });
      resolve({
        errCode: 0,
        data: doctors,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let saveDetailInforDoctor = (infor) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!infor.doctorId || !infor.contentHTML || !infor.contentMarkdown) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let doctorInfor = await db.markdown.findOne({
          where: { doctorId: infor.doctorId },
        });
        if (doctorInfor) {
          //update
          await doctorInfor.save({
            contentHTML: infor.contentHTML,
            contentMarkdown: infor.contentMarkdown,
            description: infor.description,
            doctorId: infor.doctorId,
          });
          resolve({
            errCode: 0,
            message: "Update the doctor's infor success",
          });
        } else {
          //create
          await db.markdown.create({
            contentHTML: infor.contentHTML,
            contentMarkdown: infor.contentMarkdown,
            description: infor.description,
            doctorId: infor.doctorId,
          });
          resolve({
            errCode: 0,
            message: "Create the doctor's infor success",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getDetailDoctorById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let data = await db.User.findOne({
          where: { id: id },
          attributes: {
            exclude: ["password"],
          },
          include: [
            {
              model: db.allCode,
              as: "positionData",
              attributes: ["value_en", "value_vi"],
            },
            {
              model: db.allCode,
              as: "genderData",
              attributes: ["value_en", "value_vi"],
            },
            {
              model: db.markdown,
              as: "markdown",
              attributes: ["contentHTML", "contentMarkdown", "description"],
            },
          ],
          raw: true,
          nest: true,
        });
        if (data && data.image) {
          data.image = new Buffer(data.image, "base64").toString("binary");
        }
        if (!data) {
          data = {};
        }
        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let bulkCreateSchedule = (inputData) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputData) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let data = inputData;
        if (data && data.length > 0) {
          data = data.map((item) => {
            item.maxNumber = MAX_NUMBER_SCHEDULE;
            return item;
          });
        }
        let exist = await db.schedule.findAll({
          where: {
            doctorId: inputData[0].doctorId,
            date: inputData[0].date,
          },
        });
        if (exist && exist.length > 0) {
          //update
          await db.schedule.destroy({
            where: {
              doctorId: inputData[0].doctorId,
              date: inputData[0].date,
            },
          });
        }
        await db.schedule.bulkCreate(data);
        resolve({
          errCode: 0,
          message: "Create the doctor's schedule success",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getScheduleByDate = (doctorId, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!doctorId || !date) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let data = await db.schedule.findAll({
          where: {
            doctorId: doctorId,
            date: date,
          },
        });
        if (!data) data = [];
        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getTopDoctorHome: getTopDoctorHome,
  getAllDoctors: getAllDoctors,
  saveDetailInforDoctor: saveDetailInforDoctor,
  getDetailDoctorById: getDetailDoctorById,
  bulkCreateSchedule: bulkCreateSchedule,
  getScheduleByDate: getScheduleByDate,
};