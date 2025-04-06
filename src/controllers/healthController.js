const Task = require('../models/health');
var domain = "health";

function getTaskFromBody(body) {
    return {
        'title': body['form-title'],
        'description': body['form-description'],
        'tier': body['form-tier'],
        'category': 'health',
        'priority': body['form-priority'],
        'parent': body['form-parent'],
        'dateExpired' : body['form-deadline']
    }
}

exports.display = async (_req, res) => {
    try {
        const healthTasks = await Task.find();
        res.render(domain, {healthTasks});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};


exports.save = async (req, res) => {
    console.log(req.body);
    const task = getTaskFromBody(req.body);
    console.log(task);
    Task.findByIdAndUpdate(req.body['form-id'], task)
    .then(() => {res.redirect('/health');})
    .catch(() => {
        Task(task).save()
        .then(() => {res.redirect('/health');})
        .catch((err) => {
            console.error("Error creating task: ", err);
            res.status(500).send("Error creating item");
        })
    })
};

exports.deleteTask = async (req, res) => {
    Task.findByIdAndDelete(req.body['id'])
    .then(() => {res.redirect(domain);})
    .catch((err) => {
        console.error("Error deleting task: ", err);
        res.status(500).json({message: `Task could not be deleted`});
    })
};

exports.completeTask = async (req, res) => {
    Task.findByIdAndUpdate(req.body['id'], {isCompleted: true})
    .then(() => {res.redirect(domain);})
    .catch(() => {
        console.error("Error creating task: ", err);
        res.status(500).send("Error creating item");
    });
};
