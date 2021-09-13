const sequelize = require('../config/connection');
const { Poster, Bidder, Project, Bid } = require('../models');

const posterData = require('./poster.json');
const bidderData = require('./bidder.json');
const projectData = require('./project.json');
const bidData = require('./bid.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const posters = await Poster.bulkCreate(posterData, {
        individualHooks: true,
        returning: true,
      });
    
      for (const project of projectData) {
        await Project.create({
          ...project,
          poster_id: posters[Math.floor(Math.random() * posters.length)].id,
        });
      }

    const bidders = await Bidder.bulkCreate(bidderData, {
    individualHooks: true,
    returning: true,
    });

    for (const bid of bidData) {
    await Bid.create({
        ...bid,
        bidder_id: bidders[Math.floor(Math.random() * bidders.length)].id,
    });
    }
    
    process.exit(0);
}

seedDatabase();