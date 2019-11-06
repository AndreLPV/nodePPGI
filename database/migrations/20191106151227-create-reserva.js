'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.createTable('reserva', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dataReserva: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      id_sala: {
        type: Sequelize.INTEGER
      },
      id_solicitante: {
        type: Sequelize.INTEGER
      },
      atividade: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tipo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dataInicio: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      dataTermino: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      horaInicio: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      horaTermino: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,

    });

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('reserva');
  }
};

