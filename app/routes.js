const express = require('express');
const home = require('./controllers/home');
const branch = require('./controllers/branch');
const files = require('./controllers/files');
const file = require('./controllers/file');

const router = express.Router();

// подключаю лоадер
const Gitloader = require('./gitloader');

const gtl = new Gitloader();


router.get('/', home(gtl));
router.get('/branch/:branch/', branch(gtl));
router.get('/seefiles/:path', files(gtl));
router.get('/file/:hash/:from', file(gtl));

module.exports = router;
