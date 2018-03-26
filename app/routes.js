const express = require('express');
const home = require('./controllers/home');
const branch = require('./controllers/branch');
const files = require('./controllers/files');
const file = require('./controllers/file');

const router = express.Router();

router.get('/', home);
router.get('/branch/:branch/', branch);
router.get('/seefiles/:path', files);
router.get('/file/:hash/:from', file);

module.exports = router;
