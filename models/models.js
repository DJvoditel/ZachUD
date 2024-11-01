const { type } = require('os') 
const sequelize = require('../db') 
const {DataTypes, DATE, MEDIUMINT} = require('sequelize') 
const { model } = require('crypto-js') 
 
const Processing_action = sequelize.define('Processing_action',{ 
    number_action: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true}, 
    number_protocol: {type: DataTypes.INTEGER}, 
    poryadok_destviya: {type: DataTypes.TEXT}, 
    opisanie: {type: DataTypes.TEXT}, 
    viyavlenie_obst: {type: DataTypes.TEXT} 
},  {timestamps: false}) 
 
const Protocol = sequelize.define('Protocol', { 
    number_protocol: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true}, 
    location: {type: DataTypes.TEXT}, 
    date_and_time_start: {type: DataTypes.DATE}, 
    date_and_time_end: {type: DataTypes.DATE}, 
    accept: {type: DataTypes.BOOLEAN} 
},  {timestamps: false}) 
 
const Uchastnik = sequelize.define('Uchastnik', { 
    id_uch: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true}, 
    FIO: {type: DataTypes.INTEGER}, 
    location: {type: DataTypes.TEXT,  unique: true}, 
    Male_Female: {type: DataTypes.TEXT}, 
    Date_Birthday: {type: DataTypes.DATEONLY} 
}, {timestamps: false}) 

const Uchastnik_deistviya = sequelize.define('Uchastnik_deistviya', { 
    id_uchastiya: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, 
    number_protocol: {type: DataTypes.INTEGER, references: {model: Protocol, key: 'number_protocol'}}, 
    id_uch: {type: DataTypes.INTEGER, references: {model: Uchastnik, key: 'id_uch'}} 
}, {timestamps: false}) 
 

Protocol.hasMany(Processing_action, {
  foreignKey: 'number_protocol'
})
Protocol.hasMany(Uchastnik_deistviya, {
  foreignKey: 'number_protocol'
})
Uchastnik.hasMany(Uchastnik_deistviya, {
  foreignKey: 'id_uch'
})
 
module.exports = { 
    Processing_action, Uchastnik, Uchastnik_deistviya, Protocol  
}