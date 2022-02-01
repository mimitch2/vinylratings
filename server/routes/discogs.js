const express = require('express');
const router = express.Router();
const fetch = require('cross-fetch');
const helpers = require('../helpers/helpers.js');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const userName = process.env.REACT_APP_DISCOGS_USER_NAME;
const headers = {
    Authorization: `Discogs token=${process.env.REACT_APP_DISCOGS_TOKEN}`,
    'User-Agent': 'MJMHomepage/0.1 +http://my-homepage.com'
};

if (!process.env.REACT_APP_DISCOGS_API_KEY) {
    throw new Error('No Discogs Consumer Key available');
}
if (!process.env.REACT_APP_DISCOGS_SECRET) {
    throw new Error('No Discogs Consumer Secret available');
}

const { JWT_SECRET } = process.env;

if (!JWT_SECRET) {
    throw new Error('No JWT_SECRET provided');
}

const consumerKey = process.env.REACT_APP_DISCOGS_API_KEY;
const consumerSecret = process.env.REACT_APP_DISCOGS_SECRET;

let oAuthRequestTokenSecret;
let oAuthRequestToken;
let oAuthAccessTokenSecret;
let oAuthAccessToken;

router.get('/auth', async (request, response, next) => {
    try {
        const tokenResponse = await fetch(
            'https://api.discogs.com/oauth/request_token',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `OAuth oauth_consumer_key="${consumerKey}",oauth_signature_method="PLAINTEXT",oauth_timestamp="${Date.now()}",oauth_nonce="${Date.now()}",oauth_version="1.0",oauth_signature="${consumerSecret}&", oauth_callback="http://${request.hostname
                        }:${process.env.PORT}/discogs/return"`,
                },
            }
        );

        const token = await tokenResponse.text();
        const params = new URLSearchParams(token);
        oAuthRequestToken = params.get('oauth_token');
        oAuthRequestTokenSecret = params.get('oauth_token_secret');
        response.send(`https://discogs.com/oauth/authorize?oauth_token=${oAuthRequestToken}`)
    } catch (error) {
        next(response.status(500).send('Internal Server Error'));
    }
});

router.get('/return', async (request, response, next) => {
    const { oauth_verifier: oAuthVerifier } = request.query;

    try {
        const tokenResponse = await fetch(
            'https://api.discogs.com/oauth/access_token',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `OAuth oauth_consumer_key="${consumerKey}",oauth_nonce="${Date.now()}",oauth_token="${oAuthRequestToken}", oauth_signature=${consumerSecret}&${oAuthRequestTokenSecret}",oauth_signature_method="PLAINTEXT",oauth_timestamp="${Date.now()}",oauth_verifier="${oAuthVerifier}"`,
                },
            }
        );

        const responseToken = await tokenResponse.text();
        const params = new URLSearchParams(responseToken);
        oAuthAccessToken = params.get('oauth_token');
        oAuthAccessTokenSecret = params.get('oauth_token_secret');

        const identityResponse = await fetch(
            'https://api.discogs.com/oauth/identity',
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `OAuth oauth_consumer_key="${consumerKey}", oauth_nonce="${Date.now()}", oauth_token="${oAuthAccessToken}", oauth_signature="${consumerSecret}&${oAuthAccessTokenSecret}",oauth_signature_method="PLAINTEXT",oauth_timestamp="${Date.now()}"`,
                },
            }
        );
        const identity = await identityResponse.json();
        const username = jwt.sign(identity.username, JWT_SECRET);
        if (oAuthAccessToken && oAuthAccessTokenSecret) {
            const token = jwt.sign(oAuthAccessToken, JWT_SECRET);
            const secret = jwt.sign(oAuthAccessTokenSecret, JWT_SECRET);
            response.cookie(
                'auth',
                JSON.stringify({
                    username: username,
                    token: token,
                    secret: secret,
                }),
                { httpOnly: true }
            );

            response.redirect(`http://localhost:3000/search`);
        }
    } catch (error) {
        next(response.status(500).send('Internal Server Error'));
    }
});

const saveUser = async ({ userName, password, email }) => {
    const user = await User.create({ user_name: userName, password, email });
    console.log("Saving the user");
    return user;
}

router.get('/search', (req, res, next) => {
    const query = helpers.generateQueryParams({ params: req.query });

    fetch(`${process.env.REACT_APP_DISCOGS_ENDPOINT}/database/search${query}`, {
        headers
    })
        .then((res) => res.json())
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            console.log('err', err);
        });
});

router.get('/ratings', (req, res, next) => {
    const { releaseId } = req.query;

    fetch(
        `${process.env.REACT_APP_DISCOGS_ENDPOINT}/releases/${releaseId}/rating`,
        {
            headers
        }
    )
        .then((res) => res.json())
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            console.log('err', err);
        });
});

router.get('/wantlist', (req, res, next) => {
    fetch(`${process.env.REACT_APP_DISCOGS_ENDPOINT}/users/${userName}/wants`, {
        headers
    })
        .then((res) => res.json())
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            console.log('err', err);
        });
});

router.get('/folders', (req, res, next) => {
    fetch(
        `${process.env.REACT_APP_DISCOGS_ENDPOINT}/users/${userName}/collection/folders`,
        {
            headers
        }
    )
        .then((res) => res.json())
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            console.log('err', err);
        });
});

router.get('/collection', (req, res, next) => {
    const { folder, page } = req.query;

    const authCookie = req.cookies ?? 'NOPE';
    console.log("🚀 ~ file: discogs.js ~ line 182 ~ router.get ~ authCookie", authCookie)

    // const token = jwt.verify(authCookie.token, JWT_SECRET);
    // const secret = jwt.verify(authCookie.secret, JWT_SECRET);

    fetch(
        `${process.env.REACT_APP_DISCOGS_ENDPOINT}/users/${userName}/collection/folders/${folder}/releases?page=${page}`,
        {
            headers
        }
    )
        .then((res) => res.json())
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            console.log('err', err);
        });
});

router.get('/releases/:id', async (req, res, next) => {
    const { id } = req.params
    fetch(
        `${process.env.REACT_APP_DISCOGS_ENDPOINT}/releases/${id}`,
        {
            headers
        }
    )
        .then((res) => res.json())
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            console.log('err', err);
        });
});

module.exports = router;
