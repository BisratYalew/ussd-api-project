const EventEmitter = require('events').EventEmitter;

const User = require('../models/user.model');
const { hash: hashPin, compare: comparePin } = require('../utils/pin');
const { generate: generateToken } = require('../utils/token');


/**
 * @api {post} /api/auth/signup Register a new user
 * @apiName Register User
 * @apiGroup User
 *
 * @apiParam {String} firstname Users first name.
 * @apiParam {String} lastname Users last name.
 * @apiParam {String} accountNumber Users account number.
 * @apiParam {String} phoneNumber Users phone number.
 * @apiParam {String} pin 4 digit pin code number.
 *
 * @apiSuccess (201) {Number} id Unique identifier number of the registered user.
 * @apiSuccess (201) {String} firstname Firstname of the User.
 * @apiSuccess (201) {String} lastname  Lastname of the User.
 */
exports.signup = (req, res) => {
    const { firstname, lastname, phoneNumber, accountNumber, pin } = req.body;
    const hashedPin = hashPin(pin.trim());

    let taskflow = new EventEmitter();

    // Logic Flow
    // 1. Check if phone number exists
    // 2. Register User

    // I have used trim function to remove whitespaces
    const user = new User(firstname.trim(), lastname.trim(), phoneNumber.trim(), accountNumber.trim(), hashedPin);

    taskflow.on('checkIfPhoneNumberExists', () => {
        User.findByPhoneNumber(phoneNumber?.trim(), (_, data) => {
            if (data) {
                res.status(400).send({
                    status: 'error',
                    message: `A user with this phoneNumber - '${phoneNumber}' already exits`
                });
                return;
            }
            taskflow.emit('register');
        });
    });

    taskflow.on('register', () => {
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
    })


    taskflow.emit('checkIfPhoneNumberExists');

};


/**
 * @api {post} /api/auth/signin Login a User.
 * @apiName Login User
 * @apiGroup User
 *
 * @apiParam {String} phoneNumber Users phone number.
 * @apiParam {String} pin 4 digit pin code number.
 *
 * @apiSuccess (200) {Object} token JWT Token
 * @apiSuccess (200) {Object} Users information.
 */
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
                const token = generateToken({ id: data?.id, firstname: data?.firstname, lastname: data?.lastname, phoneNumber: data?.phoneNumber, accountNumber: data?.accountNumber });
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

/**
 * @api {get} /api/auth/me Get the authenticated user profile
 * @apiName Get My Profile
 * @apiGroup User
 *
 * @apiSuccess {String} firstname Users' firstname.
 * @apiSuccess {String} lastname Users' lastname.
 * @apiSuccess {String} accountNumber Users' account number.
 * @apiSuccess {String} phoneNumber Users' phone number.
 */
exports.getMyProfile = (req, res) => {
    return res.status(200).json({
        message: "Successfull authorization",
        user: req?.user?.id
    })

}