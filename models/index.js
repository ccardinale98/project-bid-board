const Poster = require('./Poster');
const Bidder = require('./Bidder');
const Project = require('./Project');
const Bid = require('./Bid');

Poster.hasMany(Project, {
    foreignKey: 'poster_id'
})

Project.belongsTo(Poster, {
    foreignKey: 'poster_id'
})

Bidder.hasMany(Project, {
    foreignKey: 'bidder_id'
})

// do we need this?
Project.belongsTo(Bidder, {
    foreignKey: 'bidder_id'
})

Project.hasMany(Bid, {
    foreignKey: 'project_id'
})

Bid.belongsTo(Project, {
    foreignKey: 'project_id'
})

Bidder.hasMany(Bid, {
    foreignKey: 'bidder_id'
})

//do we need this?
Bidder.belongsTo(Bid, {
    foreignKey: 'bidder_id'
})

Poster.hasMany(Bidder, {
    foreignKey: 'poster_id'
})

Bidder.belongsTo(Poster, {
    foreignKey: 'poster_id'
})

module.exports = { Poster, Bidder, Project, Bid }