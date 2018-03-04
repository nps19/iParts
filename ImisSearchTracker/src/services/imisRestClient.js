export const ImisRestClient = {
    getAsync,
    postAsync
};

const AUTH_TOKEN_INPUT_ID = "__RequestVerificationToken";
const API_BASE_URL = "/api";

let initPromise = null;

function getAsync(relUrl, headers = null) {
    return performQueryAsync("get", relUrl, headers);
}

function postAsync(relUrl, headers = null, data) {
    return performQueryAsync("post", relUrl, headers, data);
}

function performQueryAsync(method, relUrl, headers, data) {
    return initAsync()
        .then(
            authToken => new Promise(
                (resolve, reject) => {
                    jQuery.ajax(
                        buildUrl(relUrl),
                        {
                            type: method,
                            headers: buildHeaders(authToken, headers),
                            data: data !== undefined ? JSON.stringify(data) : undefined,
                            success: data => {
                                return resolve(
                                    data != null
                                        ? data["Items"] != null
                                            ? data["Items"]["$values"]
                                            : data["Items"]
                                        : data
                                );
                            },
                            error: reason => reject(`Request to ${relUrl} failed: ${reason}`)
                        }
                    )
                }
            )
        );
}

function initAsync() {
    return initPromise || (
        initPromise = getInitPromise()
            .catch(reason => Promise.reject(`Unable to get auth token: ${reason}`))
    );
}

function getInitPromise() {
    const tokenInput = document.getElementById(AUTH_TOKEN_INPUT_ID);
    if (!tokenInput)
        return Promise.reject(`Unable to retrieve token input element '${AUTH_TOKEN_INPUT_ID}'.`);

    const token = tokenInput.value || "";
    if (token === "")
        return Promise.reject(`Token input ${AUTH_TOKEN_INPUT_ID} has empty value.`);

    return Promise.resolve(token);
}

function buildUrl(relUrl) {
    // TODO: Fix this.
    return `${API_BASE_URL}${relUrl[0] === "/" ? "" : "/"}${relUrl}`;
}

function buildHeaders(authToken, customHeaders) {
    return {
        ...{"RequestVerificationToken": authToken},
        ...(customHeaders || {})
    };
}
