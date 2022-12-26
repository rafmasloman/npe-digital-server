const express = require('express');
const router = express.Router();
const {
  viewCreate,
  createTestimoni,
  viewEdit,
  editTestimoni,
  deleteTestimoni,
  testimoni,
} = require('./controller');

const { isAdminLogin } = require('../middleware/auth');

router.use(isAdminLogin);

router.get('/', testimoni);
router.get('/create', viewCreate);
router.get('/edit/:id', viewEdit);
router.post('/create', createTestimoni);
router.put('/edit/:id', editTestimoni);
router.delete('/delete/:id', deleteTestimoni);

module.exports = router;
