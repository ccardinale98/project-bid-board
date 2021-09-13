//project model
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Project extends Model {}

Project.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      project_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      date_created: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      lowest_bid: {
        type: DataTypes.FLOAT,
        allowNull: false,
        references: {
            model: 'bid',
            key: 'bid_amount',
        }
      },
      poster_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'poster',
          key: 'id',
        },
      },
      bidder_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'bidder',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'project',
    }
  );
  
  module.exports = Project;