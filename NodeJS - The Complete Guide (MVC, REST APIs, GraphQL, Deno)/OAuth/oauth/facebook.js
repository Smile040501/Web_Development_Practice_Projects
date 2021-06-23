const queryString = require("query-string");
const axios = require("axios");

// Go to the Facebook App page: https://developers.facebook.com/apps
// Add a new app and call it what ever you want to.
// Navigate to the app’s basic settings page — it’s in the left sidebar and Copy your App ID
// Copy your APP_ID and APP_SECRET
const APP_ID = "YOUR_APP_ID";
const APP_SECRET = "YOUR_APP_SECRET";

// Facebook automatically approves all localhost addresses while the app is in development mode
// Add these routes to your Facebook App’s settings under Valid OAuth Redirect URIs.
const REDIRECT_SIGNUP_URI = "http://localhost:3000/auth/facebook/signup/";
const REDIRECT_LOGIN_URI = "http://localhost:3000/auth/facebook/login/";
//* Troubleshooting: should Facebook say your redirect URI is incorrect, put|remove a “/” (slash) at the end or the redirect URI.

// Facebook login Url
// All we need to do here is append a few parameters to the Facebook login url.
// See all the url parameter options: https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow#login
// Frontend Links will direct to this Url
const getUrl = (redirect_uri) => {
    const stringifiedParams = queryString.stringify({
        client_id: APP_ID,
        redirect_uri: redirect_uri,
        // Make sure your scopes match up to the data that you wish to access later on in your code
        scope: ["email", "user_friends"].join(","), // comma seperated string
        response_type: "code",
        auth_type: "rerequest",
        display: "popup",
    });
    // Appending above parameters to the url
    return `https://www.facebook.com/v4.0/dialog/oauth?${stringifiedParams}`;
};

exports.facebookSignupUrl = getUrl(REDIRECT_SIGNUP_URI);
exports.facebookLoginUrl = getUrl(REDIRECT_LOGIN_URI);

// The users will be redirected to your app (to the redirect_uri provided by you)
// The url they are redirect to will contain a special code
// For example: http://localhost:3000/auth/facebook/login?code=CODE_IS_HERE
// We will use it to create an access token.
// An access token is required to authenticate any future requests we send to Facebook such as getting the user’s name or email address.
// See url parameter options: https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow#confirm
exports.getAccessTokenFromCode = async function (code, action) {
    // redirect_uri for each code should be same as passed above
    const redirect_uri = action === "LOGIN" ? REDIRECT_LOGIN_URI : REDIRECT_SIGNUP_URI;
    try {
        const { data } = await axios({
            url: "https://graph.facebook.com/v4.0/oauth/access_token",
            method: "get",
            params: {
                client_id: APP_ID,
                client_secret: APP_SECRET,
                redirect_uri: redirect_uri,
                code: code,
            },
        });
        // console.log(data); // { access_token, token_type, expires_in }
        return data.access_token;
    } catch (err) {
        console.log(err);
    }
};

// Now that you got the access token, we can use it to get data from the Facebook API.
// Create a HTTP request with the access token to get the user’s data.
// See the Facebook API Explorer: https://developers.facebook.com/tools/explorer
exports.getFacebookUserInfo = async function (access_token) {
    try {
        const { data } = await axios({
            url: "https://graph.facebook.com/me",
            method: "get",
            params: {
                fields: ["id", "email", "first_name", "last_name"].join(","),
                access_token: access_token,
            },
        });
        // console.log(data); // { id, email, first_name, last_name }
        return data;
    } catch (err) {
        console.log(err);
    }
};
