const SSR_ID_PARAM = 'ssr_id';
const ENDPOINT_VENDOR_CTA = 'vendor-cta';
const ENDPOINT_VENDOR_EMAIL = 'vendor-email';
const ENDPOINT_VENDOR_CONVERSION = 'vendor-form';

function sendEvent(endpoint, payload) {
    return fetch(`https://select-software-reviews.bubbleapps.io/api/1.1/wf/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });
}

function hasSsrId() {
    return window.location.search.includes(SSR_ID_PARAM);
}

function isEmailInput(element) {
    return element.matches('input[type="email"]') || element.matches('input[id="email"]') || element.matches('input[name="email"]');
}

if (hasSsrId()) {
    const ssrId = new URLSearchParams(window.location.search).get(SSR_ID_PARAM);

    document.addEventListener('click', function(event) {
        if (event.target.tagName === 'A' && event.target.href) {
            sendEvent(ENDPOINT_VENDOR_CTA, { ssr_id: ssrId })
                .catch(error => {
                    console.error(`Error sending event to ${ENDPOINT_VENDOR_CTA}: ${error}`);
                });
        }
    });

    document.addEventListener('blur', function(event) {
        if (isEmailInput(event.target)) {
            var email = event.target.value;
            sendEvent(ENDPOINT_VENDOR_EMAIL, { ssr_id: ssrId, email: email })
                .catch(error => {
                    console.error(`Error sending event to ${ENDPOINT_VENDOR_EMAIL}: ${error}`);
                });
        }
    }, true);

    document.addEventListener('submit', function(event) {
        if (event.target.matches('form')) {
            event.preventDefault();
            const form = event.target;
            
            sendEvent(ENDPOINT_VENDOR_CONVERSION, { ssr_id: ssrId })
                .then(response => {
                    if (response.ok) {
                        form.submit();
                    } else {
                        console.error(`Error sending event to ${ENDPOINT_VENDOR_CONVERSION}: ${response.statusText}`);
                    }
                })
                .catch(error => {
                    console.error(`Error sending event to ${ENDPOINT_VENDOR_CONVERSION}: ${error}`);
                });
        }
    });
}
