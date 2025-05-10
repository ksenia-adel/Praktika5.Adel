'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      {
        tableName: 'books',
        schema: 'books'
      },
      'imageUrl',
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      {
        tableName: 'books',
        schema: 'books'
      },
      'imageUrl'
    );
  }
};
