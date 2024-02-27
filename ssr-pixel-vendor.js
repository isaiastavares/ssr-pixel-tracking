const SSR_ID_PARAM = 'ssr_id';
const ENDPOINT_VENDOR_CTA = 'vendor-cta2';
const ENDPOINT_VENDOR_EMAIL = 'vendor-email';
const ENDPOINT_VENDOR_CONVERSION = 'vendor-form';

function sendEvent(endpoint, payload) {
    fetch(`https://select-software-reviews.bubbleapps.io/version-test/api/1.1/wf/${endpoint}`, {
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

if (hasSsrId()) {
    const ssrId = new URLSearchParams(window.location.search).get(SSR_ID_PARAM);

    document.addEventListener('click', function (event) {
        if (event.target.tagName === 'A' && event.target.href) {
            sendEvent(ENDPOINT_VENDOR_CTA, { ssr_id: ssrId });
        }
    });

    document.addEventListener('input', function (event) {
        if (event.target.matches('input[type="email"]')) {
            sendEvent(ENDPOINT_VENDOR_EMAIL, { ssr_id: ssrId });
        }
    });

    document.addEventListener('submit', function (event) {
        if (event.target.matches('form')) {
            sendEvent(ENDPOINT_VENDOR_CONVERSION, { ssr_id: ssrId });
        }
    });
}
