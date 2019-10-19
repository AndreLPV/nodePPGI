/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const reserva =  sequelize.define('j17_reservas', {
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    dataReserva: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    idSolicitante: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    },
    atividade: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    tipo: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    dataInicio: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    dataTermino: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    horaInicio: {
      type: DataTypes.TIME,
      allowNull: false
    },
    horaTermino: {
      type: DataTypes.TIME,
      allowNull: false
    },
    
    
  }, {
    tableName: 'j17_reservas',
    timestamps: false
  });
  reserva.associate = function (models) {
    reserva.belongsTo(models.j17_reservas_salas,{
      foreignKey:"sala",
      as:'salao'
    })
  };
  return reserva
};
