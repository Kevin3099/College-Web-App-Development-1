'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');
const logger = require('../utils/logger');

const commentStore = {

  store: new JsonStore('./models/comment-store.json', { commentCollection: [] }),
  collection: 'commentCollection',

   addcomment(comment) {
    this.store.add(this.collection, comment);
  },
   getUsercomments(userid){
      return this.store.findBy(this.collection, {userid: userid})
  },
    getAllComments() {
    return this.store.findAll(this.collection);
  },
};

module.exports = commentStore;