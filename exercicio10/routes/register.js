const express = require('express');
const router = require('router');
const registerController = require('../controllers/registerController');

router.post('/', registerController.handleNewUser);

module.exports = router;