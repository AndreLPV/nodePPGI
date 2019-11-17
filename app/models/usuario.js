'use strict';
module.exports = (sequelize, DataTypes) => {
  const usuario = sequelize.define('usuario', {
    nome: DataTypes.STRING,
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  }, {
    underscored:true,
    //Adicionando esse freezeTableName porque o sequelize fica buscando na tabela usuarios, mesmo ali em cima estando no singular.
    freezeTableName: true,
    tablename: 'usuario'
  });
  usuario.associate = function (models) {
    usuario.hasMany(models.reserva, { foreignKey: 'id_solicitante' })

  };
  return usuario;
};