const CLIENT_ID = process.env.CLIENT_ID;
const API_KEY = process.env.API_KEY;

// Discovery doc URL for APIs used by the quickstart
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/drive.file';

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
                loadPearchiveFolder().then((res) => {
                    resolve(res);
                });

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

async function loadPearchiveFolder() {
    let response;
    try {
        response = await gapi.client.drive.files.list({
            q: 'name = "Pearchive" and mimeType = "application/vnd.google-apps.folder" and trashed = false',
            fields: 'nextPageToken, files(id, name)',
        })
    }
    catch (err) {
        console.error(err.message);
        return;
    }
    const files = response.result.files;
    if (!files || files.length == 0) {
        return null;
    }
    return files[0]
}

export async function openFolder(id: string) {
    let response;
    try {
        response = await gapi.client.drive.files.get({
            fileId: id
        })
    }
    catch (err) {
        console.error(err.message);
        return;
    }
    return response.result
}

export async function initializePearchiveFolder() {
    let response;
    try {
        response = await gapi.client.drive.files.create({
            name: 'Pearchive',
            mimeType: 'application/vnd.google-apps.folder',
        })
    }
    catch (err) {
        console.error(err.message);
        return;
    }
    return response.result
}

export async function createFile(name: string, file: File | Blob) {
    let response;
    try {
        // Get the ID of the "Pearchive" folder in the user's Google Drive root folder
        const folderId = await getFolderId('Pearchive');

        const metadata = {
            name: name ?? file.name,
            mimeType: file.type,
            parents: [folderId],
        };

        const formData = new FormData();
        formData.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
        formData.append('file', file);

        const url = 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart';
        const token = await gapi.auth.getToken();

        response = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token.access_token}`,
            },
            body: formData,
        });

        response = await response.json();
    } catch (err) {
        console.error(err.message);
        return;
    }
    return response;
}

export async function createFolder(name: string) {
    const folderId = await getFolderId('Pearchive');

    let response;
    try {
        response = await gapi.client.drive.files.create({
            name: name,
            mimeType: 'application/vnd.google-apps.folder',
            parents: [folderId]
        })
    }
    catch (err) {
        console.error(err.message);
        return;
    }
    return response.result
}


// Helper function to get the ID of the "Pearchive" folder in the user's Google Drive root folder
async function getFolderId(folderName) {
    const response = await gapi.client.drive.files.list({
        q: `name='${folderName}' and mimeType='application/vnd.google-apps.folder' and 'root' in parents`,
        fields: 'files(id)',
    });
    const folder = response.result.files[0];
    if (folder) {
        return folder.id;
    } else {
        throw new Error(`Folder '${folderName}' not found.`);
    }
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