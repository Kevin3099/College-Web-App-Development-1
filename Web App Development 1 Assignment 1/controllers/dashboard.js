'use strict';

const logger = require('../utils/logger');
const teamStore= require('../models/team-store');

const dashboard = {
  index(request, response) {
    logger.info('dashboard rendering');
    const viewData = {
      title: 'team Dashboard',
      teams: teamStore.getAllteams(),
    };
    logger.info('about to render', teamStore.getAllteams());
    response.render('dashboard', viewData);
  },
  deleteteam(request, response) {
    const teamId = request.params.id;
    logger.debug(`Deleting team ${teamId}`);
    teamStore.removeteam(teamId);
    response.redirect('/dashboard');
  },
};

module.exports = dashboard;