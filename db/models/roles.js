module.exports = (sequelize, DataTypes) => {
  const Roles = sequelize.define('Roles', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  }, {
    classMethods: {
      associate(models) {
          // associations can be defined here
        Roles.hasMany(models.Users, {
          onDelete: 'CASCADE',
          foreignKey: 'roleId',
        });
      },
    },
    freezeTableName: true,
  });
  return Roles;
};
