const express = require('express');
const router = express.Router();
const fetch = require('cross-fetch');
const helpers = require('../helpers/helpers.js');
require('dotenv').config();
const jwt = require('jsonwebtoken');

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

let discogsAuthTokenSecret;
let discogsAuthRequestToken;
let discogsAccessTokenSecret;
let discogsAccessToken;

router.get('/me', async (request, response, next) => {
    const auth = request?.cookies?.auth;
    if (!auth) {
        response.send({ username: null })
    }
    const parsedAuth = JSON.parse(auth)
    const username = jwt.verify(parsedAuth.username, JWT_SECRET);

    response.send({ username })
});

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
        discogsAuthRequestToken = params.get('oauth_token');
        discogsAuthTokenSecret = params.get('oauth_token_secret');
        authorizedHeaders =
            response.send(`https://discogs.com/oauth/authorize?oauth_token=${discogsAuthRequestToken}`)
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
                    Authorization: `OAuth oauth_consumer_key="${consumerKey}",oauth_nonce="${Date.now()}",oauth_token="${discogsAuthRequestToken}", oauth_signature=${consumerSecret}&${discogsAuthTokenSecret}",oauth_signature_method="PLAINTEXT",oauth_timestamp="${Date.now()}",oauth_verifier="${oAuthVerifier}"`,
                },
            }
        );

        const responseToken = await tokenResponse.text();
        const params = new URLSearchParams(responseToken);
        discogsAccessToken = params.get('oauth_token');
        discogsAccessTokenSecret = params.get('oauth_token_secret');

        const identityResponse = await fetch(
            'https://api.discogs.com/oauth/identity',
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `OAuth oauth_consumer_key="${consumerKey}", oauth_nonce="${Date.now()}", oauth_token="${discogsAccessToken}", oauth_signature="${consumerSecret}&${discogsAccessTokenSecret}",oauth_signature_method="PLAINTEXT",oauth_timestamp="${Date.now()}"`,
                },
            }
        );
        const identity = await identityResponse.json();

        const username = jwt.sign(identity.username, JWT_SECRET);
        if (discogsAccessToken && discogsAccessTokenSecret) {
            const token = jwt.sign(discogsAccessToken, JWT_SECRET);
            const secret = jwt.sign(discogsAccessTokenSecret, JWT_SECRET);
            response.cookie(
                'auth',
                JSON.stringify({
                    username: username,
                    token: token,
                    secret: secret,
                }),
                { httpOnly: true }
            );
            authorizedHeaders = `OAuth oauth_consumer_key="${consumerKey}", oauth_nonce="${Date.now()}", oauth_token="${token}", oauth_signature="${consumerSecret}&${secret}",oauth_signature_method="PLAINTEXT",oauth_timestamp="${Date.now()}"`

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
    const { auth } = req.cookies;
    const { Authorization } = helpers.getDiscogsHeadersAndUsername({ consumerKey, consumerSecret, auth });

    const query = helpers.generateQueryParams({ params: req.query });

    fetch(`${process.env.REACT_APP_DISCOGS_ENDPOINT}/database/search${query}`, {
        headers: { Authorization }
    })
        .then((res) => res.json())
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            console.log('xxxx');
            console.warn('err', err);
        });
});

// router.get('/ratings', (req, res, next) => {
//     const { releaseId } = req.query;

//     fetch(
//         `${process.env.REACT_APP_DISCOGS_ENDPOINT}/releases/${releaseId}/rating`,
//         {
//             headers
//         }
//     )
//         .then((res) => res.json())
//         .then((data) => {
//             res.send(data);
//         })
//         .catch((err) => {
//             console.log('err', err);
//         });
// });

router.get('/wantlist', (req, res, next) => {
    const { auth } = req.cookies;
    const { username, Authorization } = helpers.getDiscogsHeadersAndUsername({ consumerKey, consumerSecret, auth });

    fetch(`${process.env.REACT_APP_DISCOGS_ENDPOINT}/users/${username}/wants`, {
        headers: { Authorization }
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
    const { auth } = req.cookies;
    const { username, Authorization } = helpers.getDiscogsHeadersAndUsername({ consumerKey, consumerSecret, auth });


    fetch(
        `${process.env.REACT_APP_DISCOGS_ENDPOINT}/users/${username}/collection/folders`,
        {
            headers: { Authorization }
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

router.get('/collection', async (req, res, next) => {
    const { folder, page } = req.query;
    const { auth } = req.cookies;
    const { username, Authorization } = helpers.getDiscogsHeadersAndUsername({ consumerKey, consumerSecret, auth });


    fetch(
        `${process.env.REACT_APP_DISCOGS_ENDPOINT}/users/${username}/collection/folders/${folder}/releases?page=${page}`,
        {
            headers: { Authorization }
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
    const { auth } = req.cookies;
    const { Authorization } = helpers.getDiscogsHeadersAndUsername({ consumerKey, consumerSecret, auth });

    fetch(
        `${process.env.REACT_APP_DISCOGS_ENDPOINT}/releases/${id}`,
        {
            headers: { Authorization }
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
