const express           = require('express');
const router            = express.Router();

const authenticate      = require('../middleware/authenticate');
const menuController    = require('../controller/menu');


router.post('/start', authenticate, menuController.start);

module.exports = router;