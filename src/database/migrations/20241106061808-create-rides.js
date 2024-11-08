"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("rides", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      passenger_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "passengers",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      driver_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "drivers",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      status: {
        type: Sequelize.ENUM(
          "Aguardando Motorista",
          "Em Andamento",
          "Finalizada"
        ),
        allowNull: false,
        defaultValue: "Aguardando Motorista",
      },
      origin: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      destination: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      date_time_request: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      date_time_start: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      date_time_end: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      value: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable("rides");
  },
};
