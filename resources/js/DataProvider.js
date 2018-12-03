/* eslint-env browser */
/* global Team, getJSON */

var Bundesliga = Bundesliga || {};

Bundesliga.DataProvider = function() {
  "use strict";

  const REQUEST_TABLE_URL =
    "https://www.openligadb.de/api/getbltable/bl1/2018",
    REQUEST_MATCH_DAY =
    "https://www.openligadb.de/api/getmatchdata/bl1/2018/{{DAY}}";

  var that = new EventTarget(),
    table;

  function update() {
    getJSON(REQUEST_TABLE_URL).then(onTableDataAvailable).then(
      getNextMatchDay).catch(onError);
  }

  function onTableDataAvailable(data) {
    let promise = new Promise(function(resolve, reject) {
      table = [];
      for (let i = 1; i <= data.length; i++) {
        let team = Bundesliga.Team.fromData(data[i - 1], i);
        table.push(team);
      }
      let event = new Event("onUpdateAvailable");
      event.table = table;
      resolve();
    });
    return promise;
  }

  function getNextMatchDay() {
    let currentMatchday = 1;
    for (let i = 0; i < table.length; i++) {
      if (currentMatchday < table[i].matches) {
        currentMatchday = table[i].matches;
      }
    }
    table.currentMatchday = currentMatchday;
    getJSON(REQUEST_MATCH_DAY.replace("{{DAY}}", table.currentMatchday+1)).then(
      onMatchDayDataAvailble).catch(onError);
  }

  function onMatchDayDataAvailble(data) {
    for (let i = 0; i < data.length; i++) {
      let match = data[i],
      teamA = getTeamById(match.Team1.TeamId),
      teamB = getTeamById(match.Team2.TeamId);
    if(teamA) {
    teamA.setNextOpponent(match.Team2);
  }
    if(teamB) {
    teamB.setNextOpponent(match.Team1);
  }
    }
    let event = new Event("onUpdateAvailable");
    event.table = table;
    that.dispatchEvent(event);
  }

  function onError(error) {
    throw error;
  }

  function getTeamById(id) {
    let team = table.find(function(team) {
      return team.teamID === id;
    });
    return team;
  }

  that.update = update;
  return that;
};