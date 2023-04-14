const CLIENT_ID = process.env.CLIENT_ID;
const API_KEY = process.env.API_KEY;

console.log("CLIENT_ID: " + CLIENT_ID);
// Discovery doc URL for APIs used by the quickstart
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly';

let tokenClient;

export const initGoogleDependencies = () => {
    gisLoaded();
    gapiLoaded();
}

/**
     * Callback after the API client is loaded. Loads the
     * discovery doc to initialize the API.
     */
async function initializeGapiClient() {
    await gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: [DISCOVERY_DOC]
    });
}

/**
 *  Sign in the user upon button click.
 */
export const SignIn = () => {
    return new Promise((resolve, reject) => {
        tokenClient.callback = async (resp) => {
            if (resp.error !== undefined) {
                reject(resp);
            } else {
                await listFiles();
                resolve("Signed in");
            }
        };

        if (gapi.client.getToken() === null) {
            // Prompt the user to select a Google Account and ask for consent to share their data
            // when establishing a new session.
            tokenClient
                .requestAccessToken({ prompt: 'consent' })
        } else {
            // Skip display of account chooser and consent dialog for an existing session.
            tokenClient
                .requestAccessToken({ prompt: '' })
        }

    });
};

/**
     * Print metadata for first 10 files.
     */
async function listFiles() {
    let response;
    try {
        response = await gapi.client.drive.files.list({
            pageSize: 10,
            fields: 'files(id, name)'
        });
    } catch (err) {
        console.error(err.message);
        return;
    }
    const files = response.result.files;
    if (!files || files.length == 0) {
        //document.getElementById('content').innerText = 'No files found.';
        return;
    }
    // Flatten to string to display
    const output = files.reduce((str, file) => `${str}${file.name} (${file.id})\n`, 'Files:\n');
    console.log(output);
}

/**
     * Callback after Google Identity Services are loaded.
     */
function gisLoaded() {
    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: '' // defined later
    });
}

/**
 * Callback after api.js is loaded.
 */
function gapiLoaded() {
    gapi.load('client', initializeGapiClient);
}