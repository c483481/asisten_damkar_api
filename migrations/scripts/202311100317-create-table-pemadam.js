"use strict";

const { CommonColumn } = require("../columns");
const { id, version, createdAt, updatedAt,  xid, modifiedBy } = CommonColumn;

const name = "pemadam"
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
            posId: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: "pos",
                    key: "id",
                },
            },
            truckId: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: "truck",
                    key: "id",
                },
            },
            userXid: {
                type: Sequelize.STRING(26),
                allowNull: false,
                unique: true,
            },
        });
    },

    async down(queryInterface, _Sequelize) {
        await queryInterface.dropTable(name);
    },
};
