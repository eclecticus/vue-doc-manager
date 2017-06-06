module.exports = (sequelize, DataTypes) => {
  const Documents = sequelize.define('Documents', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Your Document must have a Title',
        },
      },
    },

    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Document cannot be empty',
        },
      },
    },

    access: {
      type: DataTypes.STRING,
      defaultValue: 'public',
      allowNull: false,
      validate: {
        isIn: [['private', 'public', 'role']],
      },
    },

    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
      },
    },

  }, {
    classMethods: {
      associate(models) {
          // associations can be defined here
        Documents.belongsTo(models.Users, {
          as: 'owner',
          onDelete: 'CASCADE',
          foreignKey: { allowNull: true },
        });
      },
    },
  });
  return Documents;
};
