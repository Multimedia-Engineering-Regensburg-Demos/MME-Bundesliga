/* eslint-env browser */

var Bundesliga = Bundesliga || {};

Bundesliga.App = (function() {
  "use strict";

  var that = {},
    data,
    table;

  function init() {
    initTableView();
    initDataProvider();
  }

  function initTableView() {
    let matchDayEl = document.querySelector(".matchday"),
      tableEl = document.querySelector("#table table");
    table = Bundesliga.TableView(matchDayEl, tableEl);
  }

  function initDataProvider() {
    data = Bundesliga.DataProvider();
    data.addEventListener("onUpdateAvailable", onDataUpdated);
    data.update();
  }

  function onDataUpdated(data) {
    table.render(data.table);
  }

  that.init = init;
  return that;
}());

Bundesliga.App.init();