'use strict';

const logger = require('../utils/logger');
const teamStore = require('../models/team-store');

const team = {
  index(request, response) {
    const teamId = request.params.id;
    logger.debug('team id = ', teamId);
    const viewData = {
      title: 'team',
      team: teamStore.getteam(teamId),
    };
    response.render('team', viewData);
  },
  deleteplayer(request, response) {
    const teamId = request.params.id;
    const playerId = request.params.playerid;
    logger.debug(`Deleting player ${playerId} from team ${teamId}`);
    teamStore.removeplayer(teamId, playerId);
    response.redirect('/team/' + teamId);
  },
};

module.exports = team;