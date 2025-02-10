const Task = require('../models/task');

function getTaskFromBody(body) {
    return {
        'name': body['task-name'],
        'description': body['task-desc'],
        'tier': body['task-tier'],
        'deadline': body['task-deadline'],
        'created': new Date(),
        'isStarted': false,
        'isCompleted': false,
    }
}

exports.saveTask = async (req, res) => {
    const task = getTaskFromBody(req.body);
    Task.findByIdAndUpdate(req.body['taskId'], task)
    .then(() => {res.redirect('/pyramid');})
    .catch(() => {
        Task(task).save()
        .then(() => {res.redirect('/pyramid');})
        .catch((err) => {
            console.error("Error creating task: ", err);
            res.status(500).send("Error creating item");
        })
    })
};

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.render("pyramid", {tasks});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

exports.deleteTask = async (req, res) => {
    Task.findByIdAndDelete(req.body['taskId'])
    .then(() => {res.redirect('/pyramid');})
    .catch((err) => {
        console.error("Error deleting task: ", err);
        res.status(500).json({message: `Task could not be deleted`});
    })
};

exports.completeTask = async (req, res) => {
    Task.findByIdAndUpdate(req.body['taskId'], {isCompleted: true})
    .then(() => {res.redirect('/pyramid');})
    .catch(() => {
        console.error("Error creating task: ", err);
        res.status(500).send("Error creating item");
    });
};

