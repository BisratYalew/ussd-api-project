const jwt = require('jsonwebtoken');
const { builder } = require('../utils/menuBuilder');

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, 'thisissamplesecret', (err, user) => {
            if (err) {
                return res.status(403).json({ message: "Invalid authentication credentials" });
            }

            req.user = user;
            next();
        });
    } else {
        let data = builder('welcome');
        res.status(200).json(data);
    }
};

module.exports = authenticateJWT;