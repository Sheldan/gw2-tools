function updateOptions(options, apiKey) {
    const update = { ...options };
    if (apiKey) {
        update.headers = {
            ...update.headers,
            "gw2-api-key": `${apiKey}`,
        };
    }
    return update;
}

export default function fetcher(url, options) {
    return fetch(url, updateOptions(options, options.apiKey));
}