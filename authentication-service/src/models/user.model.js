const db = require('../config/db.config');
const { createNewUser: createNewUserQuery, findUserByPhoneNumber } = require('../database/queries');
const { logger } = require('../utils/logger');

class User {

    constructor(firstname, lastname, phoneNumber, accountNumber, pin) {
        this.firstname     = firstname;
        this.lastname      = lastname;
        this.phoneNumber   = phoneNumber;
        this.accountNumber = accountNumber;
        this.pin           = pin;
    }

    static create(newUser, cb) {
        db.query(createNewUserQuery,
            [
                newUser.firstname,
                newUser.lastname,
                newUser.phoneNumber,
                newUser.accountNumber,
                newUser.pin
            ], (err, res) => {
                if (err) {
                    logger.error(err.message);
                    cb(err, null);
                    return;
                }
                cb(null, {
                    id: res.insertId,
                    firstname: newUser.firstname,
                    lastname: newUser.lastname,
                    phoneNumber: newUser.phoneNumber,
                    accountNumber: newUser.accountNumber,
                });
        });
    }

    static findByPhoneNumber(phoneNumber, cb) {
        db.query(findUserByPhoneNumber, phoneNumber, (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            if (res.length) {
                cb(null, res[0]);
                return;
            }
            cb({ kind: "not_found" }, null);
        })
    }
}

module.exports = User;