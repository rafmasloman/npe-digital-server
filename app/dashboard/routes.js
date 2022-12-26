const express = require('express');
const router = express.Router();
const { dashboard } = require('./controller');
const { isAdminLogin } = require('../middleware/auth');

router.use(isAdminLogin);
router.get('/', dashboard);

module.exports = router;
