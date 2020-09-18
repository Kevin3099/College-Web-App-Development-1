'use strict';

const logger = require('../utils/logger');
const accounts = require ('./accounts.js');
const commentStore= require('../models/comment-store');
const uuid = require('uuid');

const about = {
  index(request, response) {
      const loggedInUser = accounts.getCurrentUser(request);  
    logger.info('about rendering');
    if (loggedInUser) {
    const viewData = {
      title: 'About comments',
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      comment: commentStore.getAllComments(),
    };
    response.render('about', viewData);
   }
    else response.redirect('/');
},
  addcomment(request,response){
  const loggedInUser = accounts.getCurrentUser(request);
  const now = new Date();
  const newcomment = {
  id: uuid(),
  userid: loggedInUser.id,
  feedback: request.body.feedback,
  date: now,
  name: loggedInUser.firstName,
  };
    logger.debug('Creating a new comment', newcomment);
    commentStore.addcomment(newcomment);
    response.redirect('/about');
},
};

module.exports = about;
