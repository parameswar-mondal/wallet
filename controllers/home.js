// Home
exports.getHome = (req, res, next) => {
    return res.status(200).send({
        message: 'Welcome to the wallet API!'
    });
};