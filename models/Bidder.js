const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Bidder extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

Bidder.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      company_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [8],
        },
      },
    },
    {
      hooks: {
        beforeCreate: async (newBidderData) => {
          newBidderData.password = await bcrypt.hash(newBidderData.password, 10);
          return newBidderData;
        },
        beforeUpdate: async (updatedBidderData) => {
          updatedBidderData.password = await bcrypt.hash(updatedBidderData.password, 10);
          return updatedBidderData;
        },
      },
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'bidder',
    }
  );
  
  module.exports = Bidder;