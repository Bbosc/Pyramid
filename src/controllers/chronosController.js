exports.display = async (_req, res) => {
    try {
        res.render("chronos");
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};
