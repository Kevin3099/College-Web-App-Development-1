'use strict';

const logger = require('../utils/logger');
const teamStore= require('../models/team-store');
const JsonStore = require('../models/json-store');
const accounts = require ('./accounts.js');
const uuid = require('uuid');
const pictureStore = require('../models/picture-store.js');

const dashboard = {
   index(request, response) {
    logger.info('dashboard rendering');
    const loggedInUser = accounts.getCurrentUser(request);
     logger.info('user', loggedInUser);
    if (loggedInUser) {
    const viewData = {
      teams: teamStore.getUserteams(loggedInUser.id),
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
       title: 'PictureStore Dashboard',
      user: loggedInUser,
      album: pictureStore.getAlbum(loggedInUser.id),
    };
    logger.info('about to render', viewData.teams);
    response.render('dashboard', viewData);
    }
    else response.redirect('/');
  },
  
  deleteteam(request, response) {
    const teamId = request.params.id;
    logger.debug(`Deleting team ${teamId}`);
    teamStore.removeteam(teamId);
    response.redirect('/dashboard');
  },
  
  addteam(request,response){
  const loggedInUser = accounts.getCurrentUser(request);
  const newteam = {
  id: uuid(),
  userid: loggedInUser.id,
  title: request.body.title,
  players: [],
  };
    logger.debug('Creating a new team', newteam);
    teamStore.addteam(newteam);
    response.redirect('/dashboard');
},
    uploadPicture(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    pictureStore.addPicture(loggedInUser.id, request.body.title, request.files.picture, function () {
      response.redirect('/dashboard');
    });
  },
      deleteAllPictures(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    pictureStore.deleteAllPictures(loggedInUser.id);
    response.redirect('/dashboard');
  },

  deletePicture(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    pictureStore.deletePicture(loggedInUser.id, request.query.img);
    response.redirect('/dashboard');
  },
};

module.exports = dashboard;