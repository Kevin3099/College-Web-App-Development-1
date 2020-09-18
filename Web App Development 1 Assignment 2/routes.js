'use strict';

const express = require('express');
const router = express.Router();

const start = require('./controllers/start.js');
const dashboard = require('./controllers/dashboard.js');
const about = require('./controllers/about.js');
const team = require('./controllers/team.js');
const accounts = require ('./controllers/accounts.js');

router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

router.get('/start', start.index);

router.get('/dashboard', dashboard.index);
router.get('/about', about.index);
router.get('/team/:id', team.index);
router.get('/team/:id/deleteplayer/:playerid', team.deleteplayer);
router.get('/dashboard/deleteteam/:id', dashboard.deleteteam);
router.get('/dashboard/deleteallpictures', dashboard.deleteAllPictures);
router.get('/dashboard/deletepicture', dashboard.deletePicture);

router.post('/dashboard/addteam', dashboard.addteam);
router.post('/team/:id/addplayer', team.addplayer);
router.post('/dashboard/uploadpicture', dashboard.uploadPicture);
router.post('/about/:id/addcomment', about.addcomment);

module.exports = router;
