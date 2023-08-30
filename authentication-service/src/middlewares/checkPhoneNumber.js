const User = require('../models/user.model');

const checkPhoneNumber =  (req, res, next) => {
    const { phoneNumber } = req.body;
    User.findByPhoneNumber(phoneNumber, (_, data) => {
        if (data) {
            res.status(400).send({
                status: 'error',
                message: `A user with this phoneNumber - '${phoneNumber}' already exits`
            });
            return;
        }
        next();
    });
}

module.exports = checkPhoneNumber;