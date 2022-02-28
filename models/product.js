'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, { foreignKey: "CategoryId" })
      Product.hasMany(models.Cart, {foreignKey: "ProductId" })
    }
  }
  Product.init({
    name: {
      type:DataTypes.STRING,
      validate:{
        notEmpty: {
          msg: `Product Name is require`
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty :{
          msg: `Price is require`
        }
      }
    },
    stock:{
      type: DataTypes.INTEGER,
      validate: {
        notEmpty :{
          msg: `Stock is require`
        }
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:`imageUrl is require`
        }
      }
    },
    description: {
      type:DataTypes.STRING,
      validate:{
        notEmpty: {
          msg: `Description is require`
        }
      }
    },
    CategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};