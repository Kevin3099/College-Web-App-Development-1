'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const teamStore = {

  store: new JsonStore('./models/team-store.json', { teamCollection: [] }),
  collection: 'teamCollection',

  getAllteams() {
    return this.store.findAll(this.collection);
  },

  getteam(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  addteam(team) {
    this.store.add(this.collection, team);
  },

  removeteam(id) {
    const team = this.getteam(id);
    this.store.remove(this.collection, team);
  },

  removeAllteams() {
    this.store.removeAll(this.collection);
  },

  addplayer(id, player) {
    const team = this.getteam(id);
    team.players.push(player);
  },

  removeplayer(id, playerId) {
    const team = this.getteam(id);
    const players = team.players;
    _.remove(players, { id: playerId});
  },
  getUserteams(userid){
      return this.store.findBy(this.collection, {userid: userid})
  },
};


module.exports = teamStore;