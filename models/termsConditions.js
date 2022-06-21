const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection')  //the model is connected to the database
const TermsConditions = sequelize.define('Terms_Conditions', {
    // Model attributes are defined here
    terms_conditions_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    terms_of_use: {
        type: DataTypes.STRING,
        
    },
    notice_privacy: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdat: {
        type: DataTypes.DATE,
        allowNull: false
    },
    updatedat: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
});
module.exports = TermsConditions;