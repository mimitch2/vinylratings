const _ = require('lodash');
const jwt = require('jsonwebtoken');
const fetch = require('cross-fetch');

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
  updateRelease: async ({ stars, release }) => {
    const numberOfStars = Object.keys(stars).length;

    release.ratingsCount = release.ratingsCount += 1;
    const { overallRatingTotal, ratingsCount } = release;
    const { quietness, flatness, physicalCondition } = stars;

    const newRatingsTotal = (quietness + flatness + physicalCondition).toFixed(1);

    const newRatingsOverallAverage = (newRatingsTotal / numberOfStars).toFixed(1);
    const overallAverage =
      ratingsCount > 1
        ? ((overallRatingTotal + newRatingsTotal) / numberOfStars / ratingsCount).toFixed(1)
        : newRatingsOverallAverage;

    release.overallRatingAverage = overallAverage;
    release.overallRatingTotal = release.overallRatingTotal += newRatingsTotal;

    _.forEach(stars, (value, key) => {
      const averageKey = `${key}Average`;
      const totalKey = `${key}Total`;
      const average = (
        ratingsCount > 1 ? (value + release[totalKey]) / ratingsCount : value
      ).toFixed(1);

      release[averageKey] = average;
      release[totalKey] = release[totalKey] += value;
    });

    await release.save();
  }
  // getUser: async ({username, Authourization}) => {

  // }
};
