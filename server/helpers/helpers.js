const _ = require('lodash');
const jwt = require('jsonwebtoken');

module.exports = {
  generateQueryParams: ({ params }) => {
    return _.reduce(
      params,
      (result, val, key) => {
        let encodedKeyValue = '';
        const dividerSymbol = result ? '&' : '?';

        if (_.isArray(val)) {
          const arrayString = `[${val.join(',').replace(',', '||')}]`;

          encodedKeyValue = `${encodeURIComponent(key)}=${arrayString}`;
        } else {
          encodedKeyValue = `${encodeURIComponent(key)}=${encodeURIComponent(val)}`;
        }

        return `${result}${dividerSymbol}${encodedKeyValue}`;
      },
      ''
    );
  },
  getDiscogsHeadersAndUsername: ({ consumerKey, consumerSecret, auth }) => {
    const parsedAuth = JSON.parse(auth);
    const token = jwt.verify(parsedAuth.token, process.env.JWT_SECRET);
    const secret = jwt.verify(parsedAuth.secret, process.env.JWT_SECRET);
    const username = jwt.verify(parsedAuth.username, process.env.JWT_SECRET);

    return {
      username,
      Authorization: `OAuth oauth_consumer_key="${consumerKey}", oauth_nonce="${Date.now()}", oauth_token="${token}", oauth_signature="${consumerSecret}&${secret}",oauth_signature_method="PLAINTEXT",oauth_timestamp="${Date.now()}"`
    };
  },
  updateRelease: async ({ quietness, flatness, physicalCondition, release, isNew = true }) => {
    const { overallRatingAverage, ratingsCount } = release;
    const newRatingsOverallAverage = (+quietness + +flatness + +physicalCondition) / 3;
    const average = ratingsCount
      ? (+overallRatingAverage + newRatingsOverallAverage) / +ratingsCount
      : newRatingsOverallAverage;

    if (isNew) {
      release.ratingsCount = release.ratingsCount += 1;
    }

    release.overallRatingAverage = average;

    await release.save();
  }
};
