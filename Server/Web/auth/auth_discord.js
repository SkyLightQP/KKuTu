const config = require('../../sub/config/auth.json');

module.exports.config = {
    strategy: require('passport-discord').Strategy,
    color: '#7289DA',
    fontColor: '#FFFFFF',
    vendor: 'discord',
    displayName: 'withDiscord'
}

module.exports.strategyConfig = {
    clientID: config.discord.clientID, // 보안을 위해서입니다.
    clientSecret: config.discord.clientSecret, // 이 방법을 사용하는 것을
    callbackURL: config.discord.callbackURL, // 적극 권장합니다.
    passReqToCallback: true
}

module.exports.authConfig = {
    scope: ['identify', 'email']
}

module.exports.strategy = (process, MainDB, Ajae) => {
    return (req, accessToken, refreshToken, profile, done) => {
        const $p = {};

        $p.authType = "discord";
        $p.id = profile.id;
        $p.name = profile.username;
        $p.title = profile.username;
        $p.image = "https://cdn.discordapp.com/avatars/" + profile.id + "/" + profile.avatar + ".jpg";

        process(req, accessToken, MainDB, $p, done);
    }
}