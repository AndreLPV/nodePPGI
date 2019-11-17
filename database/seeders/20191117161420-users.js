'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('usuario', [
      {
        id: 1,
        nome: 'Professor 1',
        created_at:new Date(),
        updated_at:new Date(),
      },
      {
        id: 2,
        nome: 'Professor 2',
        created_at:new Date(),
        updated_at:new Date(),
      },
    ], {});

  },

  down: (queryInterface, Sequelize) => {
   
      return queryInterface.bulkDelete('usuario', null, {});
    
  }
};

