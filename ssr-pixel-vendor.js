function hasSSRCookie() {
  return document.cookie.indexOf('SSR_visited=true') !== -1;
}

function hasSSRQueryParam() {
  return window.location.search.indexOf('SSR_visited=true') !== -1;
}

function isUserOnPageForEnoughTime() {
  var timeThreshold = 30000; // 30 seconds
  var currentTime = new Date().getTime();
  var pageLoadTime = window.performance.timing.domContentLoadedEventEnd;
  return (currentTime - pageLoadTime) >= timeThreshold;
}

function isUserAgentValid() {
  var userAgent = navigator.userAgent.toLowerCase();

  return userAgent.indexOf('bot') === -1;
}

function sendDataToServer() {
  document.addEventListener('click', function (event) {
    if ((hasSSRCookie() || hasSSRQueryParam()) && isUserOnPageForEnoughTime() && isUserAgentValid()) {
      var domain = window.location.hostname;
      var clickedCTA = '';
      var source = '';

      var xhr = new XMLHttpRequest();
      var url = 'https://seuservidor.com/rastreamento';
      xhr.open('POST', url, true);
      xhr.setRequestHeader('Content-Type', 'application/json');

      var data = {
        domain: domain,
        clickedCTA: clickedCTA,
        source: source,
      };

      xhr.send(JSON.stringify(data));
    }
  });
}

document.addEventListener('DOMContentLoaded', sendDataToServer);
