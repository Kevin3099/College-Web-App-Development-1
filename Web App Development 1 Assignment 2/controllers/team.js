'use strict';

const logger = require('../utils/logger');
const uuid = require('uuid');
const teamStore = require('../models/team-store');
const accounts = require ('./accounts.js');


const team = {
  index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);  
    const teamId = request.params.id;
    logger.debug('team id = ', teamId);
    if (loggedInUser) {
    const viewData = {
      title: 'team',
      team: teamStore.getteam(teamId),
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
    };
    response.render('team', viewData);
    }
    else response.redirect('/');
},
  deleteplayer(request, response) {
    const teamId = request.params.id;
    const playerId = request.params.playerid;
    logger.debug(`Deleting player ${playerId} from team ${teamId}`);
    teamStore.removeplayer(teamId, playerId);
    response.redirect('/team/' + teamId);
  },
  addplayer(request, response) {
    const teamId = request.params.id;
    const team = teamStore.getteam(teamId);
    const newplayer = {
      id: uuid(),
      playername: request.body.playername,
      playernumber: request.body.playernumber,
      playerposition: request.body.playerposition,
    };
    teamStore.addplayer(teamId, newplayer);
    response.redirect('/team/' + teamId);
  },
};

module.exports = team;