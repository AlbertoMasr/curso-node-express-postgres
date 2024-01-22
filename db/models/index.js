const { User, userSchema } = require('./userModel');

function setUpModels(sequelize) {
    User.init(userSchema, User.config(sequelize));
}

module.exports = setUpModels;