const mongoose = require('mongoose');

const newSchema = new mongoose.Schema({
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

module.exports = mongoose.model("Health", newSchema);
