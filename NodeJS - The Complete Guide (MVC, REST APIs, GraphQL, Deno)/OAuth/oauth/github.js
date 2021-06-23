const queryString = require("query-string");
const axios = require("axios");

// Go to the OAuth Apps section of the GitHub developer settings: https://github.com/settings/developers
// Click the New OAuth App button and create an app.
// Copy your CLIENT_ID and CLIENT_SECRET
const CLIENT_ID = "YOUR_CLIENT_ID";
const CLIENT_SECRET = "YOUR_CLIENT_SECRET";

// We can also test GitHub login on localhost, just provide the localhost address instead of the domain address.
// Add the route to your GitHub App’s settings under Authorization callback URL.
const REDIRECT_SIGNUP_URI = "http://localhost:3000/auth/github/signup/";
const REDIRECT_LOGIN_URI = "http://localhost:3000/auth/github/login/";
//* Troubleshooting: should GitHub say your redirect URI is incorrect, put|remove a “/” (slash) at the end or the redirect URI.

// GitHub login Url
// All we need to do here is append a few parameters to the GitHub login url.
// See url parameter options: https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/#1-request-a-users-github-identity
// See scope options: https://developer.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/
// Frontend Links will direct to this Url
const getUrl = (redirect_uri) => {
    const stringifiedParams = queryString.stringify({
        client_id: CLIENT_ID,
        redirect_uri: redirect_uri,
        // Make sure your scopes match up to the data that you wish to access later on in your code
        scope: ["read:user", "user:email"].join(" "), // space seperated string
        allow_signup: true,
    });
    // Appending above parameters to the url
    return `https://github.com/login/oauth/authorize?${stringifiedParams}`;
};

exports.githubSignupUrl = getUrl(REDIRECT_SIGNUP_URI);
exports.githubLoginUrl = getUrl(REDIRECT_LOGIN_URI);

// The users will be redirected to your app (to the redirect_uri provided by you)
// The url they are redirect to will contain a special code
// For example: http://localhost:3000/auth/github/login?code=CODE_IS_HERE
// We will use it to create an access token.
// An access token is required to authenticate any future requests we send to GitHub such as getting the user’s name or email address.
// See url parameter options: https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/#2-users-are-redirected-back-to-your-site-by-github
exports.getAccessTokenFromCode = async function (code, action) {
    // redirect_uri for each code should be same as passed above
    const redirect_uri = action === "LOGIN" ? REDIRECT_LOGIN_URI : REDIRECT_SIGNUP_URI;
    try {
        const { data } = await axios({
            url: "https://github.com/login/oauth/access_token",
            method: "get",
            params: {
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                redirect_uri: redirect_uri,
                code: code,
            },
        });
        /**
         * GitHub returns data as a string we must parse.
         */
        const parsedData = queryString.parse(data);
        // console.log(parsedData); // { token_type, access_token, error, error_description }
        if (parsedData.error) throw new Error(parsedData.error_description);
        return parsedData.access_token;
    } catch (err) {
        console.log(err);
    }
};

// Now that you got the access token, we can use it to get data from the GitHub API.
// Create a HTTP request with the access token to get the user’s data.
// See the GitHub API options: https://developer.github.com/v3/
exports.getGitHubUserInfo = async function (access_token) {
    try {
        const { data } = await axios({
            url: "https://api.github.com/user",
            method: "get",
            headers: {
                Authorization: `token ${access_token}`,
            },
        });
        // console.log(data); // { id, email, name, login, avatar_url }
        return data;
    } catch (err) {
        console.log(err);
    }
};
