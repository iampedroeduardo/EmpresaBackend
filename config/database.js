const Sequelize = require("sequelize");
sequelize = new Sequelize('empresa','root','',
{
    host:'localhost',
    dialect:'mysql'
})

module.exports = {
    Sequelize,
    sequelize
}