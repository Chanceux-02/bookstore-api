const express = require('express');
const router = express.Router();

const createController = require('../controllers/create.controller');

router.post('/create-user', createController.fillUser);

module.exports = router;