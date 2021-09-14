const User = require('./User');
const Project = require('./Project');
const Bid = require('./Bid');

User.belongsToMany(Project, {
    through: {
        model: Bid,
        unique: false
    },

    as: 'project_users'
});

Project.belongsToMany(User, {
    through: {
        model: Bid,
        unique: false
    },

    as: 'bids'
});

User.hasMany(Project, {
    foreignKey: 'poster_id'
})

Project.belongsTo(User, {
    foreignKey: 'poster_id'
})

module.exports = { User, Project, Bid }