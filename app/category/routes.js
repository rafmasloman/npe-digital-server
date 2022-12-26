const express = require('express');
const router = express.Router();
const {
  category,
  viewCreate,
  actionCategory,
  getAllCategory,
  viewEdit,
  editCategory,
  deleteCategory,
} = require('./controller');

const { isAdminLogin } = require('../middleware/auth');

router.use(isAdminLogin);

router.get('/', category);
router.get('/', getAllCategory);
router.get('/create', viewCreate);
router.get('/edit/:id', viewEdit);
router.post('/create', actionCategory);
router.put('/edit/:id', editCategory);
router.delete('/delete/:id', deleteCategory);

module.exports = router;
