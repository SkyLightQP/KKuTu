const JLog = require("./jjlog");
const MainDB = require('../Web/db');

function checkIPBan(addr) {
    MainDB.ipbans.findOne(['ip', addr]).on((data) => {
        if (data !== undefined) {
            return true;
        } else return false;
    });
};

function noticeBan(res, addr, html) {
    MainDB.ipbans.findOne(['ip', addr]).on((data) => {
        if (data !== undefined) {
            const reason = data.reason !== null ? data.reason : "사유 없음";
            JLog.alert("IP 차단된 사용자가 입장을 시도하였습니다. IP: " + addr);
            res.send("[#444] 당신은 영구 정지된 사용자입니다. <br/> 사유: " + reason);
        } else {
            res.send(html);
        }
    });
};

exports.checkIPBan = checkIPBan;
exports.noticeBan = noticeBan;