'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('sala', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      numero: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      localizacao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    });

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('sala');
  }
};
