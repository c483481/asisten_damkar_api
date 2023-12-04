"use strict";

const name = "items";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, _Sequelize) {
        // Mengubah kolom menjadi tidak unik
        await queryInterface.removeConstraint(name, "name");
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.changeColumn(name, "name", {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
            unique: true,
        });
    },
};
