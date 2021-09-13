const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Bid extends Model {}

Bid.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      project_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'project',
            key: 'id',
        }
      },
      poster_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'poster',
            key: 'id',
        }
      },
      bidder_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'bidder',
            key: 'id',
        }
      },
      date_created: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      bid_amount: {
        type: DataTypes.INTEGER,
        allowNull: false,  
      }
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'bid',
    }
  );
  
  module.exports = Bid;