function setSSRCookie() {
  document.cookie = 'SSR_visited=true; path=/; domain=selectsoftwarereviews.com';
}

function addSSRQueryParam(url) {
  return url + (url.indexOf('?') !== -1 ? '&' : '?') + 'SSR_visited=true';
}

document.addEventListener('click', function (event) {
  if (event.target.tagName === 'A') {
    setSSRCookie();
    
    event.target.href = addSSRQueryParam(event.target.href);
  }
});
