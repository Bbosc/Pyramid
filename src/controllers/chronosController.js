const DailyTask = require('../models/dailyTask');

function getTaskFromCard(body) {
    const [hours1, minutes1] = body['card-start'].split(':').map(num => parseInt(num, 10));
    const [hours2, minutes2] = body['card-end'].split(':').map(num => parseInt(num, 10));
    const date1 = new Date(0, 0, 0, hours1, minutes1);
    const date2 = new Date(0, 0, 0, hours2, minutes2);
    const duration = (date2 - date1) / 60000;
    return {
        'title': body['card-header'],
        'startingTime': body['card-start'].replace(':', 'h'),
        'duration': duration,
    }
}

exports.display = async (_req, res) => {
    try {
        const dailyTasks = await DailyTask.find();
        res.render("chronos", {dailyTasks});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};


exports.createTask = async (req, res) => {
    const task = new DailyTask(getTaskFromCard(req.body));
    task.save()
    .then(() => {res.redirect('/chronos');})
    .catch((err) => {
        console.error("Error creating task: ", err);
        res.status(500).send("Error creating item");
    })
};

exports.deleteTask = async (req, res) => {
    const task = getTaskFromCard(req.body);
    DailyTask.findOneAndDelete(task)
    .then(() => {res.redirect('/chronos');})
    .catch((err) => {console.error(err)});
};
