require('dotenv').config({path: __dirname+"/../config/.env"});
const mongoose = require('mongoose');


const uriCollection = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.SERVER_IP}:${process.env.DB_PORT}/`
const uriIntelligence = uriCollection + `${process.env.DB_INTELLIGENCE}?authSource=admin`;
const uriHealth = uriCollection + `${process.env.DB_HEALTH}?authSource=admin`;
const uriLegal = uriCollection + `${process.env.DB_LEGAL}?authSource=admin`;


var intelligenceConnection = mongoose.createConnection(uriIntelligence);
var healthConnection = mongoose.createConnection(uriHealth);
var legalConnection = mongoose.createConnection(uriLegal);

const taskSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: false},
    tier: {type: Number, required: true},
    category: {type: String, required: true},
    priority: {type: String, required: true},
    parent: {type: String, required: false},
    dateCreated: {type: Date, default: Date.now, required: false},
    dateExpired: {type: Date, required: false},
    dateCompleted: {type: Date, required: false},
    documents: [{type: String, required: false}]
});

exports.intelligenceModel = intelligenceConnection.model("Intelligence", taskSchema);
exports.healthModel = healthConnection.model("Health", taskSchema);
exports.legalModel = legalConnection.model("Legal", taskSchema);
