const Task = require('../models/task');

// Create

exports.saveTask = async (req, res) => {
  const appendix = {
    created: new Date(),
    isStarted: false,
    isCompleted: false
  }
  const newBody = Object.assign(req.body, appendix);
  const task = new Task(newBody);
  task.save()
    .then(() => {res.redirect('/tasks');})
    .catch((err) => {
      console.error("Error creating task: ", err);
      res.status(500).send("Error creating item");
  })
};



// Search

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.render("index", {tasks});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

exports.getAllTasksJson = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

exports.getTaskByName = async (req, res) => {
  try {
    const task = await Task.findOne({name: req.query.name})
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({message: `Task with name ${req.query.name} not found`});
    }
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

// edit

exports.editTaskByName = async (req, res) => {
  try {
    const task = await Task.findOne({name: req.params.name})
    res.render("edit", {task});
  } catch (error) {
    console.log("editing failed")
    res.status(500).json({error: error.message});
  }
};

exports.updateTask = async (req, res) => {
  Task.findByIdAndUpdate({_id: req.body.id},{
    name: req.body.name,
    description: req.body.description,
    tier: req.body.tier,
    parents: req.body.parents,
    deadline: req.body.deadline
  })
    .then(() => {res.redirect('/tasks');})
    .catch((err) => {
      console.error("Error creating task: ", err);
      res.status(500).send("Error creating item");
  });
}

// delete

exports.deleteTaskByName = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({name:req.body.name})
    if (task) {
      res.status(200).redirect('/tasks');
    } else {
      res.status(500).json({message: `Task with name ${req.body.name} could not be deleted`});
      console.error("Error deleting task: ", err);
    }
  } catch (error) {
      res.status(500).send("Error deleting item");
  }
};
