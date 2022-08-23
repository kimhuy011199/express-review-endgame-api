const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/userController');
const {
  registerValidation,
  loginValidation,
} = require('../validation/userValidation');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.get('/me', authMiddleware, getMe);

module.exports = router;
