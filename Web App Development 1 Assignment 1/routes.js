'use strict';

const express = require('express');
const router = express.Router();

const start = require('./controllers/start.js');
const dashboard = require('./controllers/dashboard.js');
const about = require('./controllers/about.js');
const team = require('./controllers/team.js');

router.get('/', start.index);
router.get('/dashboard', dashboard.index);
router.get('/about', about.index);
router.get('/team/:id', team.index);
router.get('/team/:id/deleteplayer/:playerid', team.deleteplayer);
router.get('/dashboard/deleteteam/:id', dashboard.deleteteam);

module.exports = router;
