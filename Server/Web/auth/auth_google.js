const config = require('../../sub/config/auth.json');

const isFalsyLastName = (name) => {
    if (name === undefined || name === null ||
        name === '' || name === ' ') {
        return true;
    }

    return false;
}

module.exports.config = {
    strategy: require('passport-google-oauth2').Strategy,
    color: '#FFFFFF',
    fontColor: '#FFFFFF',
    vendor: 'google',
    displayName: 'withGoogle'
}

module.exports.strategyConfig = {
    clientID: config.google.clientID, // 보안을 위해서입니다.
    clientSecret: config.google.clientSecret, // 이 방법을 사용하는 것을
    callbackURL: config.google.callbackURL, // 적극 권장합니다.
    passReqToCallback: true
}

module.exports.authConfig = {
    scope: ['profile', 'email']
}

module.exports.strategy = (process, MainDB, Ajae) => {
    return (req, accessToken, refreshToken, profile, done) => {
        const $p = {};
        const lastName = profile.name.familyName + ' ';
        const firstName = profile.name.givenName;

        $p.authType = "google";
        $p.id = profile.id;
        $p.name = (isFalsyLastName(profile.name.familyName) ? '' : lastName) + firstName;
        $p.title = profile.nickname;
        $p.image = profile.photos[0].value;

        process(req, accessToken, MainDB, $p, done);
    }
}