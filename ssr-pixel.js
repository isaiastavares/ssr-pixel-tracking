const SSR_ID_PARAM = 'ssr_id';
const SSR_PIXEL_ID = 'ssr-pixel';

function hasSsrId() {
    return window.location.search.includes(SSR_ID_PARAM);
}

function getSsrId() {
  return new URLSearchParams(window.location.search).get(SSR_ID_PARAM);
}

window.onload = function() {
    if (hasSsrId()) {
      const ssrId = getSsrId();
      var imgSrc = document.getElementById(SSR_PIXEL_ID).src;
      imgSrc = imgSrc.replace('{{ssr_id}}', ssrId);
      document.getElementById(SSR_PIXEL_ID).src = imgSrc;
    }
};
