const sequelize = require('../config/connection');
const { User, Project, Bid } = require('../models');

const userData = require('./user.json');
const projectData = require('./project.json');
const bidData = require('./bid.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: false });

    await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true
    });
    
    await Project.bulkCreate(projectData, {
      individualHooks: true,
      returning: true
    });
    
    await Bid.bulkCreate(bidData, {
      individualHooks: true,
      returning: true
    });
    
    process.exit(0);
}

seedDatabase();