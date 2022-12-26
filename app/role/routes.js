const express = require('express');
const router = express.Router();
const {
  role,
  viewCreate,
  actionRole,
  showRole,
  viewEdit,
  editRole,
  deleteRole,
} = require('./controller');

const { isAdminLogin } = require('../middleware/auth');

router.use(isAdminLogin);

router.get('/', role);
// router.get('/', showRole);
router.get('/create', viewCreate);
router.get('/edit/:id', viewEdit);
router.post('/create', actionRole);
router.put('/edit/:id', editRole);
router.delete('/delete/:id', deleteRole);

module.exports = router;
