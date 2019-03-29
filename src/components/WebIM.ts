import { isIntersectionTypeNode } from 'typescript';
// 引入Strophe方法
var Strophejs = require('strophe.js');
var Strophe = (<any>Strophejs).Strophe;

Strophe.Connection.prototype.setJid = (jid: any) => {
    Strophe.Connection.jid = jid;
    Strophe.Connection.authzid = Strophe.getBareJidFromJid(Strophe.Connection.jid);
    Strophe.Connection.authcid = Strophe.getNodeFromJid(Strophe.Connection.jid);
}

Strophe.Connection.prototype.getJid = () => {
    return Strophe.Connection.jid;
}

(<any>window).Strophe = Strophe;


var WebIM = <any>require('easemob-websdk')

// 提供$iq、$build、$msg、$pres等方法
var meStrophe = require('strophe.js')
// 声明$iq、$build、$msg、$pres等方法


var $iq = meStrophe.$iq
var $build = meStrophe.$build
var $msg = meStrophe.$msg
var $pres = meStrophe.$pres

//配置文件参考环信demo
var config = {
    xmppURL: 'im-api.easemob.com',
    apiURL: (location.protocol === 'https:' ? 'https:' : 'http:') + '//a1.easemob.com',
    appkey: 'easemob-demo#chatdemoui',
    https: false,
    isMultiLoginSessions: true,
    isAutoLogin: true,
    isWindowSDK: false,
    isSandBox: false,
    isDebug: false,
    autoReconnectNumMax: 2,
    autoReconnectInterval: 2,
    // isWebRTC: (/Firefox/.test(navigator.userAgent) || /WebKit/.test(navigator.userAgent)) && /^https\:$/.test(window.location.protocol),
    heartBeatWait: 4500,
    isHttpDNS: false,
    msgStatus: true,
    delivery: true,
    read: true,
    saveLocal: false,
    encrypt: {
        type: 'none'
    }
}

//初始化配置
WebIM.config = config

// debugger
var conn: any = () => {
    return new WebIM.connection({
        isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
        https: typeof WebIM.config.https === 'boolean' ? WebIM.config.https : location.protocol === 'https:',
        url: WebIM.config.xmppURL,
        isAutoLogin: true,
        heartBeatWait: WebIM.config.heartBeatWait,
        autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
        autoReconnectInterval: WebIM.config.autoReconnectInterval,
        apiUrl: WebIM.config.apiURL
    });
}


export interface CurrentUserInfo {
    access_token: string,
    expires_in: number,
    user: {
        activated: string,
        nickname: string,
        type: string,
        username: string,
        uuid: string
    }
}


export default {
    conn,
    WebIM
};
