const Health = require('../models/health');

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
        const healthTasks = await Health.find();
        res.render("health", {healthTasks});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};


exports.save = async (req, res) => {
    console.log(req.body);
    const task = getTaskFromBody(req.body);
    console.log(task);
    Health.findByIdAndUpdate(req.body['form-id'], task)
    .then(() => {res.redirect('/health');})
    .catch(() => {
        Health(task).save()
        .then(() => {res.redirect('/health');})
        .catch((err) => {
            console.error("Error creating task: ", err);
            res.status(500).send("Error creating item");
        })
    })
};

