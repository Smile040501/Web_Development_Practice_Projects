const queryString = require("query-string");
const axios = require("axios");

// Go to the Google developer console: https://console.developers.google.com/apis/credentials
// Select or create a Google project.
// Navigate to the credentials page — in the left sidebar — and create an OAuth client ID
// Copy your CLIENT_ID and CLIENT_SECRET
const CLIENT_ID = "YOUR_CLIENT_ID";
const CLIENT_SECRET = "YOUR_CLIENT_SECRET";

// Add your domain to the Authorized domains section
// Add them on your Project on Google Console
const REDIRECT_SIGNUP_URI = "http://localhost:3000/auth/google/signup/";
const REDIRECT_LOGIN_URI = "http://localhost:3000/auth/google/login/";
//* Troubleshooting: should Google say your redirect URI is incorrect, put|remove a “/” (slash) at the end or the redirect URI.

// Google login Url
// All we need to do here is append a few parameters to the Google login url.
// See url parameter options: https://developers.google.com/identity/protocols/OAuth2WebServer#obtainingaccesstokens
// Frontend Links will direct to this Url
const getUrl = (redirect_uri) => {
    const stringifiedParams = queryString.stringify({
        client_id: CLIENT_ID,
        redirect_uri: redirect_uri,
        // Make sure your scopes match up to the data that you wish to access later on in your code
        scope: [
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/userinfo.profile",
        ].join(" "), // space seperated string
        response_type: "code",
        access_type: "offline",
        prompt: "consent",
    });
    // Appending above parameters to the url
    return `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;
};

exports.googleSignupUrl = getUrl(REDIRECT_SIGNUP_URI);
exports.googleLoginUrl = getUrl(REDIRECT_LOGIN_URI);

// The users will be redirected to your app (to the redirect_uri provided by you)
// The url they are redirect to will contain a special code
// For example: http://localhost:3000/auth/google/login?code=CODE_IS_HERE
// We will use it to create an access token.
// An access token is required to authenticate any future requests we send to Google such as getting the user’s name or email address.
// See url parameter options: https://developers.google.com/identity/protocols/OAuth2WebServer#exchange-authorization-code
exports.getAccessTokenFromCode = async function (code, action) {
    // redirect_uri for each code should be same as passed above
    const redirect_uri = action === "LOGIN" ? REDIRECT_LOGIN_URI : REDIRECT_SIGNUP_URI;
    try {
        const { data } = await axios({
            url: `https://oauth2.googleapis.com/token`,
            method: "post",
            data: {
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                redirect_uri: redirect_uri,
                grant_type: "authorization_code",
                code: code,
            },
        });
        // console.log(data); // { access_token, expires_in, token_type, refresh_token }
        return data.access_token;
    } catch (err) {
        console.log(err);
    }
};

// Now that you got the access token, we can use it to get data from the Google API.
// Create a HTTP request with the access token to get the user’s data.
// See the Google API Explorer: https://developers.google.com/apis-explorer/#p/
exports.getGoogleUserInfo = async function (access_token) {
    try {
        const { data } = await axios({
            url: "https://www.googleapis.com/oauth2/v2/userinfo",
            method: "get",
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        // console.log(data); // { id, email, given_name, family_name }
        return data;
    } catch (err) {
        console.log(err);
    }
};
