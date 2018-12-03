/* eslint-env browser */

var Bundesliga = Bundesliga || {};

Bundesliga.Team = (function() {
  "use strict";

  function Team(id, position, name, logo, matches, points, won, draw, lost, goals, opponentGoals) {
    this.teamID = id;
    this.position = position;
    this.team = name;
    this.logo = logo;
    this.matches = matches;
    this.points = points;
    this.won = won;
    this.draw = draw;
    this.lost = lost;
    this.goals = goals;
    this.opponentGoals = opponentGoals;
    this.gd = this.goals - this.opponentGoals;
  }

  Team.prototype.setNextOpponent = function(opponent) {
    this.opponent = opponent.TeamName;
    this.opponenID = opponent.TeamId;
  };

  Team.fromData = function(data, position) {
    return new Team(data.TeamInfoId, position, data.TeamName, data.TeamIconUrl, data.Matches, data.Points, data.Won, data.Draw, data.Lost, data.Goals, data.OpponentGoals);
  };

  return Team;
}());