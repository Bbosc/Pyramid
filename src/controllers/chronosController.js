const DailyTask = require('../models/dailyTask');

exports.display = async (_req, res) => {
    try {
        const dailyTasks = await DailyTask.find();
        res.render("chronos", {dailyTasks});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};
