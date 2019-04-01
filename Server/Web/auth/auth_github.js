const config = require('../../sub/config/auth.json');

module.exports.config = {
    strategy: require('passport-github').Strategy,
    color: '#333',
    fontColor: '#FFFFFF',
    vendor: 'github',
    displayName: 'withGitHub'
}

module.exports.strategyConfig = {
    clientID: config.github.clientID,
    clientSecret: config.github.clientSecret,
    callbackURL: config.github.callbackURL
}

module.exports.authConfig = {
}

module.exports.strategy = (process, MainDB, Ajae) => {
    return (req, accessToken, refreshToken, profile, done) => {
        const $p = {};

        $p.authType = "github";
        $p.id = profile.id;
        $p.name = profile.username;
        $p.title = profile.username;
        $p.image = profile.avatar;

        process(req, accessToken, MainDB, $p, done);
    }
}