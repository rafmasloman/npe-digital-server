const express = require('express');
const router = express.Router();
const { user, actionLogin } = require('./controller');

router.get('/', user);
router.post('/dashboard', actionLogin);
module.exports = router;
