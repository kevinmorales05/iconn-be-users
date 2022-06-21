const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection')  //the model is connected to the database
const User = sequelize.define('Users', {
    // Model attributes are defined here
    user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING
        
    },
    pass: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telephone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    birthday: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    gender_id: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    photo: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "defaultPhoto.jpg"
    },
    termsAndConditions: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    latitude: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 2.34  //Monterrey latitude
    },
    longitude: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 2.34  //Monterrey longitude
    },
    createdat: {
        type: DataTypes.DATE,
        defaultValue: true,
        allowNull: true,
    },
    updatedat: {
        type: DataTypes.DATE,
        defaultValue: true,
        allowNull: true,
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: true,
    },
    sign_app_mode_id: {
        type: DataTypes.INTEGER,
        defaultValue: true,
        allowNull: true,
    },
    secret_key: {
        type: DataTypes.STRING,
        allowNull: false
    },
});
module.exports = User;