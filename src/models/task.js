const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String, required: false},
  tier: {type: Number, required: true},
  parents: [[String]],
  created: {type: Date, required: true},
  deadline: {type: Date, required: true},
  isStarted: {type: Boolean, required: true},
  isCompleted: {type: Boolean, required: true},
  completionDate: {type: Date, required: false}
});


module.exports = mongoose.model("Task", taskSchema);

