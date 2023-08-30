const { DB_NAME } = require('../utils/secrets')

const createDB = `CREATE DATABASE IF NOT EXISTS ${DB_NAME}`;

const dropDB = `DROP DATABASE IF EXISTS ${DB_NAME}`;

// Make the pin datatype varchar because the bcrypt hash is going to be saved. But on the validator, it will be only 4 digit numbers
const createTableUSers = `
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    firstname VARCHAR(50) NULL,
    lastname VARCHAR(50) NULL,
    phoneNumber VARCHAR(255) NOT NULL UNIQUE,
    accountNumber VARCHAR(50) NULL,
    pin VARCHAR(255) NOT NULL,
    created_on TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
)
`;

const createNewUser = `
INSERT INTO users VALUES(null, ?, ?, ?, ?, ?, NOW())
`;

const findUserByPhoneNumber = `
SELECT * FROM users WHERE phoneNumber = ?
`;

module.exports = {
    createDB,
    dropDB,
    createTableUSers,
    createNewUser,
    findUserByPhoneNumber
};
