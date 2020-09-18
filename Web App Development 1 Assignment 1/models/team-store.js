'use strict';

const _ = require('lodash');

const teamStore = {

  teamCollection: require('./team-store.json').teamCollection,

  getAllteams() {
    return this.teamCollection;
  },

  getteam(id) {
    return _.find(this.teamCollection, { id: id });
  },
  
  removeplayer(id, playerId) {
    const team = this.getteam(id);
    _.remove(team.players, { id: playerId });
  },
  
  removeteam(id) {
  _.remove(this.teamCollection, { id: id });
  },
  
};

module.exports = teamStore;