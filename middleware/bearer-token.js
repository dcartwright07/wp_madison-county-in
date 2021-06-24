const getToken = (config, axios) => {
    return axios.post('/oauth', {
        grant_type: 'client_credentials',
        client_id: config.apiClientId,
        client_secret: config.apiClientSecret,
        scope: ''
    }, {
        baseURL: config.wuApiUrl,
        headers: {'Accept': 'application/json'}
    });
}

export default function ({ store, $config, $axios }) {

    // only perform this at the server level.
    if (process.server) {

        // set parameters needed.
        const fileName = './.apiToken',
            timestamp = Date.now(),
            fs = require('fs'),
            promise = new Promise(async (resolve, reject) => {

                try {
                    // get our stored files timestamps.
                    const data = fs.statSync(fileName);

                    // is our file timestamp in the future?
                    if (Date.now() < data.mtimeMs) {

                        // resolve our token from our file.
                        resolve(fs.readFileSync(fileName).toString());
                        return;
                    }
                } catch (err) {
                    // ignore this error (file not found)
                }

                try {
                    // grab our token from the oAuth server,
                    // we'll reduce the expiry timestamp by 10 mins
                    // to reduce near expiring tokens.
                    const res = await getToken($config, $axios),
                        expiryTime = timestamp + (res.data.expires_in - (60 * 10));

                    // write our file and sync the times.
                    fs.writeFileSync(fileName, res.data.access_token);
                    fs.utimesSync(fileName, new Date(expiryTime), new Date(expiryTime));

                    // resolve our promise with our generated token.
                    resolve(res.data.access_token);

                } catch (err) {

                    // ToDo: handle token retrieval failure...
                    console.log(err);
                }

            });

        // once our promise is resolved, set it against our store.
        promise.then(
            // (token) => console.log(context.store.commit('main/updateToken', token)),
            (token) => store.commit('UPDATE_TOKEN', token),
            // ToDo: better handling of errors...
            (err) => console.log(err)
        );
    }
}