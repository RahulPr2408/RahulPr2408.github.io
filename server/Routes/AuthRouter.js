const { signup, login, restaurantSignup, restaurantLogin } = require('../Controllers/AuthController');
const { signupValidation, loginValidation, restaurantValidation } = require('../Middlewares/AuthValidation');

const router = require('express').Router();

// User routes
router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);

// Restaurant routes - using loginValidation for login since it only checks email and password
router.post('/restaurant/login', loginValidation, restaurantLogin);
router.post('/restaurant/signup', restaurantValidation, restaurantSignup);

module.exports = router;