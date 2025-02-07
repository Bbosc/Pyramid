const mongoose = require('mongoose');

const dailyTaskSchema = new mongoose.Schema({
    title: {type: String, required: true},
    startingTime: {type: String, required: true},
    duration: {type: Number, required: true}
});

module.exports = mongoose.model("DailyTask", dailyTaskSchema);
