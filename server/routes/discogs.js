const express = require('express');
const router = express.Router();
const fetch = require('cross-fetch');
const helpers = require('../helpers/helpers.js');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel')
console.log("🚀 ~ file: discogs.js ~ line 8 ~ User", User)

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

router.get('/me', async (req, res) => {
    const auth = req?.cookies?.auth;
    if (!auth) {
        res.send({ username: null })
    }
    const parsedAuth = JSON.parse(auth)
    const username = jwt.verify(parsedAuth.username, JWT_SECRET);

    res.send({ username })
});

router.get('/auth', async (req, res, next) => {
    try {
        const tokenResponse = await fetch(
            'https://api.discogs.com/oauth/request_token',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `OAuth oauth_consumer_key="${consumerKey}",oauth_signature_method="PLAINTEXT",oauth_timestamp="${Date.now()}",oauth_nonce="${Date.now()}",oauth_version="1.0",oauth_signature="${consumerSecret}&", oauth_callback="http://${req.hostname
                        }:${process.env.PORT}/discogs/return"`,
                },
            }
        );

        const token = await tokenResponse.text();
        const params = new URLSearchParams(token);
        discogsAuthRequestToken = params.get('oauth_token');
        discogsAuthTokenSecret = params.get('oauth_token_secret');
        res.send(`https://discogs.com/oauth/authorize?oauth_token=${discogsAuthRequestToken}`)
    } catch (error) {
        next(res.status(500).send('Internal Server Error'));
    }
});

router.get('/return', async (req, res, next) => {
    const { oauth_verifier: oAuthVerifier } = req.query;

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
        const username = identity.username;
        const discogs_id = identity.id;

        if (discogsAccessToken && discogsAccessTokenSecret) {
            const token = jwt.sign(discogsAccessToken, JWT_SECRET);
            const secret = jwt.sign(discogsAccessTokenSecret, JWT_SECRET);
            const signedUsername = jwt.sign(identity.username, JWT_SECRET);

            const user = await User.findOne({ username });

            if (!user) {
                try {
                    await User.create({ username, discogs_id });
                } catch (error) {
                    console.log("🚀 ~ file: discogs.js ~ line 110 ~ router.get ~ error", error)
                    res.status(500).send(error)
                }
            }

            res.cookie(
                'auth',
                JSON.stringify({
                    username: signedUsername,
                    token: token,
                    secret: secret,
                }),
                { httpOnly: true }
            );

            res.redirect(`http://localhost:3000/search`);
        }
    } catch (error) {
        next(res.status(500).send('Internal Server Error'));
    }
});

const saveUser = async ({ username, discogs_id }) => {
    const user = await User.create({ username, discogs_id });
    console.log("Saving the user");
    return user;
}

router.get('/search', async (req, res) => {
    const { auth } = req.cookies;
    const { Authorization } = helpers.getDiscogsHeadersAndUsername({ consumerKey, consumerSecret, auth });
    const query = helpers.generateQueryParams({ params: req.query });

    try {
        const response = await fetch(`${process.env.REACT_APP_DISCOGS_ENDPOINT}/database/search${query}`, {
            headers: { Authorization }
        });
        const data = await response.json();

        res.send(data);
    } catch (error) {
        console.warn('err', error);
    };
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

router.get('/wantlist', async (req, res) => {
    const { auth } = req.cookies;
    const { username, Authorization } = helpers.getDiscogsHeadersAndUsername({ consumerKey, consumerSecret, auth });

    try {
        const response = await fetch(`${process.env.REACT_APP_DISCOGS_ENDPOINT}/users/${username}/wants`, {
            headers: { Authorization }
        })
        const wants = await response.json()

        res.send(wants);
    } catch (error) {
        console.log('err', error);
    };
});

router.get('/folders', async (req, res) => {
    const { auth } = req.cookies;
    const { username, Authorization } = helpers.getDiscogsHeadersAndUsername({ consumerKey, consumerSecret, auth });

    try {
        const response = await fetch(
            `${process.env.REACT_APP_DISCOGS_ENDPOINT}/users/${username}/collection/folders`,
            { headers: { Authorization } }
        );
        const folders = await response.json();

        res.send(folders);
    } catch (error) {
        console.log('err', error);
    };
});

router.get('/collection', async (req, res) => {
    const { folder, page } = req.query;
    const { auth } = req.cookies;
    const { username, Authorization } = helpers.getDiscogsHeadersAndUsername({ consumerKey, consumerSecret, auth });

    try {
        const response = await fetch(
            `${process.env.REACT_APP_DISCOGS_ENDPOINT}/users/${username}/collection/folders/${folder}/releases?page=${page}`,
            { headers: { Authorization } }
        );
        const collection = await response.json();

        res.send(collection);
    } catch (error) {
        console.log('err', error);
    };
});

router.get('/releases/:id', async (req, res) => {
    const { id } = req.params
    const { auth } = req.cookies;
    const { Authorization } = helpers.getDiscogsHeadersAndUsername({ consumerKey, consumerSecret, auth });

    try {
        const response = await fetch(
            `${process.env.REACT_APP_DISCOGS_ENDPOINT}/releases/${id}`,
            { headers: { Authorization } }
        );
        const release = await response.json();

        res.send(release);
    } catch (error) {
        console.log('err', error);
    };
});

module.exports = router;
