const Poster = require('./Poster');
const Bidder = require('./Bidder');
const Project = require('./Project');
const Bid = require('./Bid');

//Poster -> Project
// ---------------------------------------------------------
Poster.hasMany(Project, {
    foreignKey: 'poster_id'
})

Project.belongsTo(Poster, {
    foreignKey: 'poster_id'
})

//Bidder -> Project
// ---------------------------------------------------------
Bidder.hasMany(Project, {
    foreignKey: 'bidder_id',
})

Project.belongsTo(Bidder, {
    foreignKey: 'bidder_id'
})

//Project -> Bid
// ---------------------------------------------------------
Project.hasMany(Bid, {
    foreignKey: 'project_id'
})

Bid.belongsTo(Project, {
    foreignKey: 'project_id'
})

//Bidder -> Bid
// ---------------------------------------------------------
Bidder.hasMany(Bid, {
    foreignKey: 'bidder_id',
})

Bid.belongsTo(Bidder, {
    foreignKey: 'bidder_id'
})

//Poster -> Bidder
// ---------------------------------------------------------
// Poster.hasMany(Bidder, {
//     foreignKey: 'poster_id'
// })

// Bidder.belongsTo(Poster, {
//     foreignKey: 'poster_id'
// })

module.exports = { Poster, Bidder, Project, Bid }