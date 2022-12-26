const express = require('express');
const router = express.Router();
const {
  user,
  actionLogin,
  registerUser,
  register,
  actionLogout,
} = require('./controller');
// const { isAdminLogin } = require('../middleware/auth');

// router.use(isAdminLogin);
router.get('/', user);
router.post('/', registerUser);
router.get('/admin/register', register);
router.get('/logout', actionLogout);
router.post('/dashboard', actionLogin);
module.exports = router;
