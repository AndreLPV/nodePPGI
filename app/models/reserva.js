/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const reserva = sequelize.define('reserva', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    dataReserva: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    id_sala: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_solicitante: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    atividade: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Preencha o campo"
        },
      }
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Escolha uma dao opções"
        },
      }
    },
    dataInicio: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Escolha uma data"
        },
      }

    },
    dataTermino: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Escolha uma data"
        },
      }
    },
    horaInicio: {
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Escolha uma hora de início"
        },
      }
    },
    horaTermino: {
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Escolha uma hora de término"
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
    tableName: 'reserva'
  });
  reserva.associate = function (models) {
    reserva.belongsTo(models.sala, { foreignKey: 'id_sala' })
    reserva.belongsTo(models.usuario, { foreignKey: 'id_solicitante' })
  };
  return reserva
};
