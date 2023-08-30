const User = require('../models/user.model');
const { hash: hashPin, compare: comparePin } = require('../utils/pin');
const { generate: generateToken } = require('../utils/token');

exports.signup = (req, res) => {
    const { firstname, lastname, phoneNumber, accountNumber, pin } = req.body;
    const hashedPin = hashPin(pin.trim());

    // I have used trim function to remove whitespaces
    const user = new User(firstname.trim(), lastname.trim(), phoneNumber.trim(), accountNumber.trim(), hashedPin);

    User.create(user, (err, data) => {
        if (err) {
            res.status(500).send({
                status: "error",
                message: err.message
            });
        } else {
            const token = generateToken(data.id);
            res.status(201).send({
                status: "success",
                data: {
                    token,
                    data
                }
            });
        }
    });

};


exports.signin = (req, res) => {
    const { phoneNumber, pin } = req.body;
    User.findByPhoneNumber(phoneNumber.trim(), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    status: 'error',
                    message: `User with phoneNumber - ${phoneNumber} was not found`
                });
                return;
            }
            res.status(500).send({
                status: 'error',
                message: err.message
            });
            return;
        }
        if (data) {
            if (comparePin(pin.trim(), data.pin)) {
                const token = generateToken(data.id);
                res.status(200).send({
                    status: 'success',
                    data: {
                        token,
                        firstname: data.firstname,
                        lastname: data.lastname,
                        phoneNumber: data.phoneNumber,
                        accountNumber: data.accountNumber,
                    }
                });
                return;
            }
            res.status(401).send({
                status: 'error',
                message: 'Incorrect pin'
            });
        }
    });

}