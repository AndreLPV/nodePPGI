/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const sala = sequelize.define('sala', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {

          msg: "Preencha o campo"
        },
        len: {
          args: [4, 50],
          msg: "O nome da sala precisa ter entre 4 e 30 caracteres."
        },

      }
    },
    numero: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isNumeric: {
          msg: "Apenas números"
        },
      }
    },
    localizacao: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {

          msg: "Preencha o campo"
        },
        len: {
          args: [4, 50],
          msg: "A localização da sala precisa ter entre 4 e 50 caracteres."
        },

      }
    },
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE,
    },
    updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE,
    },
  }, {
    tableName: 'sala'
  });
  sala.associate = function (models) {
    sala.hasMany(models.reserva, { foreignKey: 'id_sala' })
  };
  return sala
};
