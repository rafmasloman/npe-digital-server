const express = require('express');
const router = express.Router();
const {
  project,
  viewCreate,
  createProject,
  deleteProject,
  editProject,
  viewEdit,
} = require('./controller');
const multer = require('multer');
const os = require('os');
const { isAdminLogin } = require('../middleware/auth');

router.use(isAdminLogin);

router.get('/', project);
router.get('/create', viewCreate);
router.get('/edit/:id', viewEdit);
router.post(
  '/create',
  multer({ dest: os.tmpdir() }).single('thumbnail'),
  createProject,
);
router.put(
  '/edit/:id',
  multer({ dest: os.tmpdir() }).single('thumbnail'),
  editProject,
);
router.delete('/delete/:id', deleteProject);

module.exports = router;
