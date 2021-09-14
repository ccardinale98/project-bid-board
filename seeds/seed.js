const sequelize = require('../config/connection');
const { Poster, Bidder, Project, Bid } = require('../models');

const posterData = require('./poster.json');
const bidderData = require('./bidder.json');
const projectData = require('./project.json');
const bidData = require('./bid.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await Poster.bulkCreate(posterData, {
      individualHooks: true,
      returning: true
    });
    
    await Bidder.bulkCreate(bidderData, {
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