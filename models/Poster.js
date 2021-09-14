const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Poster extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

Poster.init(
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
        beforeCreate: async (newPosterData) => {
          newPosterData.password = await bcrypt.hash(newPosterData.password, 10);
          return newPosterData;
        },
        beforeUpdate: async (updatedPosterData) => {
          updatedPosterData.password = await bcrypt.hash(updatedPosterData.password, 10);
          return updatedPosterData;
        },
      },
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'poster',
    }
  );
  
  module.exports = Poster;