'use strict';

const logger = require('../utils/logger');
const teamStore = require('../models/team-store');
const accounts = require ('./accounts.js');
const start = {
  index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);  
    logger.info('start rendering');
    
     const amountOfTeams = teamStore.getAllteams();
    let totalplayers = 0;
    for (let i in amountOfTeams) {
     totalplayers = totalplayers + amountOfTeams[i].players.length;
    }
    
    if (loggedInUser) {
    const viewData = {
      title: 'Welcome to team app!',
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      amountOfTeams: amountOfTeams.length,
      totalplayers: totalplayers,
    };
    response.render('start', viewData);
    }
    else response.redirect('/');
},
};

module.exports = start;










