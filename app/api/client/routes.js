const express = require('express');
const router = express.Router();

const {
  landingPage,
  projectPage,
  mobileService,
  websiteService,
  teamsPage,
  projectDetail,
  sendMessageEmail,
  testimonials,
  service,
  servicePage,
} = require('./controller');

router.get('/', landingPage);
router.get('/projects', projectPage);
router.get('/teams', teamsPage);
router.get('/testimonials', testimonials);
router.get('/services/mobile', mobileService);
router.get('/services/website', websiteService);
router.get('/project/detail/:id', projectDetail);
router.get('/services', service);
router.get('/service/:name', servicePage);
// router.post('/contact', sendMessageEmail);
module.exports = router;
