"use strict";

const { CommonColumn } = require("../columns");
const { id, version, createdAt, updatedAt,  xid, modifiedBy } = CommonColumn;

const name = "truck"
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(name, {
            id,
            version,
            createdAt,
            updatedAt,
            xid,
            modifiedBy,
            posXid: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            plat: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            active: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            }
        });
    },

    async down(queryInterface, _Sequelize) {
        await queryInterface.dropTable(name);
    },
};
