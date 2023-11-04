"use strict";

const { CommonColumn } = require("../columns");
const { id, version, createdAt, updatedAt,  xid, modifiedBy } = CommonColumn;

const name = "fire_location"
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn(name, "active", {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        })
    },

    async down(queryInterface, _Sequelize) {
        await queryInterface.removeColumn(name, "active")
    },
};
