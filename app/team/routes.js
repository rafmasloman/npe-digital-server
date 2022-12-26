const express = require('express');
const router = express.Router();
const {
  team,
  createTeamMember,
  viewCreate,
  viewEdit,
  editTeamMember,
  deleteTeamMember,
} = require('./controller');
const multer = require('multer');
const os = require('os');
const { isAdminLogin } = require('../middleware/auth');

router.use(isAdminLogin);

router.get('/', team);
router.get('/create', viewCreate);
router.get('/edit/:id', viewEdit);
router.post(
  '/create',
  multer({ dest: os.tmpdir() }).single('image'),
  createTeamMember,
);

router.put(
  '/edit/:id',
  multer({ dest: os.tmpdir() }).single('image'),
  editTeamMember,
);
router.delete('/delete/:id', deleteTeamMember);

module.exports = router;
