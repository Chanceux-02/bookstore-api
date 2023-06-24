const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');

const createController = require('../controllers/create.controller');
const authController = require('../controllers/auth.controller');


router.post('/register', authMiddleware, createController.fillUser);
router.post('/login', authController.login);
router.post('/store', authMiddleware, createController.store);

module.exports = router;