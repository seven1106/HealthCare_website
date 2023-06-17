"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        // email: "that9011@gmail.com",
        // password: "123456",
        // firstName: "Seven",
        // lastName: "Nguyen",
        // address: "HCM",
        // gender: 1,
        // typeRole: "AD",
        // keyRole: "R1",
        // createdAt: new Date(),
        // updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("Users", null, {});
    };
  },
};
