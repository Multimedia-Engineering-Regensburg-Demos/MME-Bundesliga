/* eslint-env browser */

(function(context) {
  "use strict";

  function getContentAsJSON(url) {
    let responsePromise = new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();

      request.onreadystatechange = function() {
        if (request.readyState === XMLHttpRequest.DONE) {
          let result = JSON.parse(request.response);
          if (result) {
            resolve(result);
          } else {
            reject(new Error("Could not parse response to JSON"));
          }
        }

      };
      request.open("GET", url);
      request.send();
    });
    return responsePromise;
  }

  context.getJSON = getContentAsJSON;

}(window));