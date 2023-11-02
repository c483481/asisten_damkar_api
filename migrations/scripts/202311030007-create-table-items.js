"use strict";

const { CommonColumn } = require("../columns");
const { id, version, createdAt, updatedAt,  xid, modifiedBy } = CommonColumn;

const name = "items"
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
            truckId: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: "truck",
                    key: "id",
                },
            },
            name: {
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
