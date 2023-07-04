import db from "../models";
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
module.exports = {
  getTopDoctorHome: getTopDoctorHome,
  getAllDoctors: getAllDoctors,
  saveDetailInforDoctor: saveDetailInforDoctor,
};
