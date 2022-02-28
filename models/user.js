'use strict';
const bcrypt = require("bcryptjs");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile, { foreignKey: "UserId" })
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `Email is require`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty:{
          msg: `Password is require` 
        }
      }
    },
    roles: DataTypes.STRING,
  }, {
    hooks:{
      beforeCreate(instance, option){
        // console.log(instance);  
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(instance.password, salt);

        instance.password = hash;
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};