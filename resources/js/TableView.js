/* eslint-env browser */

var Bundesliga = Bundesliga || {};

Bundesliga.TableView = function(matchDayEl, tableEl) {
  "use strict";

  const TABLE_ENTRY_TEMPLATE = document.querySelector("#table-entry-template").innerHTML.trim();

  var that = new EventTarget(),
    tableBody = tableEl.querySelector("tbody");

  function render(data) {
    clearTable();
    for (let i = 0; i < data.length; i++) {
      let entry = createTableEntry(data[i]);
      tableBody.appendChild(entry);
    }
    matchDayEl.innerHTML = data.currentMatchday;
  }

  function createTableEntry(data) {
    let container = document.createElement("tbody"),
      // RegEx from: https://stackoverflow.com/questions/17056064/javascript-regex-match-all-and-replace
      elString = TABLE_ENTRY_TEMPLATE.replace(/\{\{(.*?)\}\}/g, function(
        match, token) {
        return data[token];
      });
    container.innerHTML = elString;
    return container.firstChild;
  }

  function clearTable() {
    while (tableBody.firstChild) {
      tableBody.removeChild(tableBody.firstChild);
    }
  }

  that.render = render;
  return that;
};