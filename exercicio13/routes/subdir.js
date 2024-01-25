const express = require('express');
const path = require('path');
const router = express.Router();


router.get('^/$|index(.html)?', (request, response) => {
  response.sendFile(path.join(__dirname,'..', 'views', 'subdir',  'index.html'));
});

router.get('/test(.html)?', (request, response) => {
  response.sendFile(path.join(__dirname,'..', 'views', 'subdir',  'test.html'));
});

module.exports = router;
