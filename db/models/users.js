import bcrypt from 'bcrypt-nodejs';

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: 6 },
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 2,
    },
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Users.belongsTo(models.Roles, {
          onDelete: 'CASCADE',
          foreignKey: 'roleId',
        });
        Users.hasMany(models.Documents, {
          onDelete: 'CASCADE',
          foreignKey: 'ownerId',
        });
      },
    },

    instanceMethods: {
      /**
       * Compare plain password to hashed one
       * @method
       * @param {String} password
       * @returns {Boolean} password match
       */
      validPassword(password) {
        return bcrypt.compareSync(password, this.password);
      },

      /**
       * Hash password received from user
       * @method
       * @returns {void}
       */
      hashPassword() {
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(9));
      },
    },
    hooks: {
      beforeCreate(user) {
        user.hashPassword();
      },
    },
  });
  return Users;
};
