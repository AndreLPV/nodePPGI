/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const sala = sequelize.define('j17_reservas_salas', {
    nome: {
      type: DataTypes.STRING(30),
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
      type: DataTypes.INTEGER(5),
      allowNull: true,
      validate: {
        isNumeric: {
          msg: "Apenas números"
        },
      }
    },
    localizacao: {
      type: DataTypes.STRING(50),
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
    }
  }, {
    tableName: 'j17_reservas_salas',
    timestamps: false
  });
  sala.associate = function (models) {
    sala.hasMany(models.j17_reservas,{
      foreignKey:"sala",
    })
  };
  return sala
};
