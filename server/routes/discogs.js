const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const helpers = require('../helpers/helpers.js');
require('dotenv').config();
const userName = process.env.REACT_APP_DISCOGS_USER_NAME;
const headers = {
    Authorization: `Discogs token=${process.env.REACT_APP_DISCOGS_TOKEN}`,
    'User-Agent': 'MJMHomepage/0.1 +http://my-homepage.com'
};

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
