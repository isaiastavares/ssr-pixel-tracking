const SSR_ID_PARAM = 'ssr_id';
const ENDPOINT_VENDOR_CTA = 'vendor-cta';
const ENDPOINT_VENDOR_EMAIL = 'vendor-email';
const ENDPOINT_VENDOR_CONVERSION = 'vendor-form';

function sendEvent(endpoint, payload) {
    fetch(`https://select-software-reviews.bubbleapps.io/api/1.1/wf/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
    .catch(error => {
        console.error(`Error sending event to ${endpoint}: ${error}`);
    });
}

function hasSsrId() {
    return window.location.search.includes(SSR_ID_PARAM);
}

if (hasSsrId()) {
    const ssrId = new URLSearchParams(window.location.search).get(SSR_ID_PARAM);

    document.addEventListener('click', function (event) {
        if (event.target.tagName === 'A' && event.target.href) {
            sendEvent(ENDPOINT_VENDOR_CTA, { ssr_id: ssrId });
        }
    });

    /*document.addEventListener('input', function (event) {
        if (event.target.matches('input[type="email"]')) {
            var email = event.target.value;
            
            sendEvent(ENDPOINT_VENDOR_EMAIL, { ssr_id: ssrId, email: email });
        }
    });*/

    document.addEventListener('blur', function (event) {
        if (event.target.matches('input[type="email"]')) {
            var email = event.target.value;
    
            sendEvent(ENDPOINT_VENDOR_EMAIL, { ssr_id: ssrId, email: email });
        }
    }, true);

    document.addEventListener('submit', function (event) {
        if (event.target.matches('form')) {
            sendEvent(ENDPOINT_VENDOR_CONVERSION, { ssr_id: ssrId });
        }
    });
}
