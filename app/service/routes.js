const express = require('express');
const router = express.Router();
const {
  service,
  createService,
  viewCreate,
  viewEdit,
  editService,
  deleteService,
} = require('./controller');
const multer = require('multer');
const os = require('os');
const { isAdminLogin } = require('../middleware/auth');

router.use(isAdminLogin);

router.get('/', service);
router.get('/create', viewCreate);
router.get('/edit/:id', viewEdit);
router.post(
  '/create',
  multer({ dest: os.tmpdir() }).single('image'),
  createService,
);

router.put(
  '/edit/:id',
  multer({ dest: os.tmpdir() }).single('image'),
  editService,
);
router.delete('/delete/:id', deleteService);

module.exports = router;
