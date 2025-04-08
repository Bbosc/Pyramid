const taskModel = require('../models/task');
const Intelligence = taskModel.intelligenceModel;
const Health = taskModel.healthModel;
const Legal = taskModel.legalModel;

async function displayTasks(Model, req, res) {
    try {
        const tasks = await Model.find();
        res.render("template", {data: {category: req.params['category'], tasks: tasks}});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

function chooseModel(req) {
    switch (req.params['category']) {
        case 'health':
            return Health;
        case 'intelligence':
            return Intelligence;
        default:
            return Legal;
    }
}

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

exports.display = async (req, res) => {
    let Model = chooseModel(req);
    displayTasks(Model, req, res);
};


exports.save = async (req, res) => {
    const task = getTaskFromBody(req.body);
    const category = req.params['category'];
    let Model = chooseModel(req);
    Model.findByIdAndUpdate(req.body['form-id'], task)
    .then(() => {res.redirect('/' + category);})
    .catch(() => {
        Model(task).save()
        .then(() => {res.redirect('/' + category);})
        .catch((err) => {
            console.error("Error creating task: ", err);
            res.status(500).send("Error creating item");
        })
    })
};

exports.deleteTask = async (req, res) => {
    let Model = chooseModel(req);
    Model.findByIdAndDelete(req.body['id'])
    .then(() => {res.redirect('/');})
    .catch((err) => {
        console.error("Error deleting task: ", err);
        res.status(500).json({message: `Task could not be deleted`});
    })
};

exports.completeTask = async (req, res) => {
    let Model = chooseModel(req);
    Model.findByIdAndUpdate(req.body['id'], {isCompleted: true})
    .then(() => {res.redirect('/');})
    .catch(() => {
        console.error("Error creating task: ", err);
        res.status(500).send("Error creating item");
    });
};
