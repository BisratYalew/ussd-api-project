const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const authenticate = require('../middlewares/authenticate');
const { signup: signupValidator, signin: signinValidator } = require('../validators/auth');
const authController = require('../controllers/auth.controller');


router.route('/signup')
    .post(signupValidator, asyncHandler(authController.signup));

router.route('/signin')
    .post(signinValidator, asyncHandler(authController.signin));

router.route('/me')
    .get(authenticate, authController.getMyProfile);

module.exports = router;