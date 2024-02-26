const TIMEOUT_DURATION = 30000; // 30 seconds
const SSR_ID_PARAM = 'ssr_id';
const ENDPOINT_VENDOR_CTA = 'vendor-cta';
const ENDPOINT_VENDOR_EMAIL = 'vendor-email';
const ENDPOINT_VENDOR_CONVERSION = 'vendor-conversion';

function sendEvent(endpoint, payload) {
    fetch(`https://select-software-reviews.bubbleapps.io/api/1.1/wf/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
    .then(response => {
        if (!response.ok) {
            console.error(`Erro ao enviar evento para ${endpoint}: ${response.status}`);
        } else {
            console.log(`Evento enviado com sucesso para ${endpoint}`);
        }
    })
    .catch(error => {
        console.error(`Error sending event to ${endpoint}: ${error}`);
    });
}

function hasSsrId() {
    return window.location.search.includes(SSR_ID_PARAM);
}

setTimeout(function () {
    if (hasSsrId()) {
        const ssrId = new URLSearchParams(window.location.search).get(SSR_ID_PARAM);

        document.addEventListener('click', function (event) {
            if (event.target.tagName === 'A' && event.target.href) {
                sendEvent(ENDPOINT_VENDOR_CTA, { click_id: ssrId });
            }
        });

        document.addEventListener('input', function (event) {
            if (event.target.matches('input[type="email"]')) {
                sendEvent(ENDPOINT_VENDOR_EMAIL, { click_id: ssrId });
            }
        });

        document.addEventListener('submit', function (event) {
            if (event.target.matches('form')) {
                sendEvent(ENDPOINT_VENDOR_CONVERSION, { click_id: ssrId });
            }
        });
    }
}, TIMEOUT_DURATION);
