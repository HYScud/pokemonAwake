let { createRole } = require("./role")
let emailTool = require("./send")
class Account {
    constructor(id, account, pwd) {
        this._id = id;
        this._account = account;
        this._nickName = "";
        this._pwd = pwd;
        this._state = 0;
        this.allRole = {};
        this.curRole = {};
    }
    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id
    }
    set nickName(nickName) {
        this._nickName = nickName
    }
    get nickName() {
        return this._nickName;
    }
    set pwd(pwd) {
        this.pwd = pwd;
    }
    get account() {
        return this._account;
    }
    get pwd() {
        return this._pwd;
    }
    isLogin() {
        return this._state == 1;
    }
    setState(ws) {
        this.ws = ws;
        ws.account = this;
        this._state = 1;
    }
    loginOut() {
        log("断开连接")
        this._state = 0;
        this.ws.account = null;
        this.ws = null;
        if (this.curRole && Object.values(this.curRole).length) {
            log(this.curRole);
            this.curRole.aObj = null;
            this.curRole.loginOut();
        }
        this.curRole = {};
    }
    getRole(serverId) {
        return this.allRole[serverId]
    }
    createRole(serverId, uId, avatar, nickname) {
        let role = createRole(serverId, uId, avatar, nickname)
        this.allRole[serverId] = role;
        return role;
    }
    packToClient() {
        let allRole = {};
        for (let serverId in this.allRole) {
            allRole[serverId] = this.allRole[serverId].packToClient();
        }
        return {
            account: this._account,
            allRole
        }
    }
    getWs() {
        return this.ws
    }
}
class CAccountManager {
    constructor() {
        this.protocol = PROTOCOL.account;
        this._allUser = {};
        this.userId = 0;
        this.codeList = {};
        this.uId = 1000;
    }
    getWs(account) {
        return this._allUser[account].ws;
    }
    getAccount(account) {
        return this._allUser[account];
    }
    onMessage(ws, sub, data) {
        switch (sub) {
            case 1:
                let {
                    account,
                    pwd
                } = data
                this.C2SLogin(ws, account, pwd);
                break;
            case 2:
                {
                    let { email, pwd, check, code } = data;
                    this.C2SRegister(ws, email, pwd, check, code)
                    break;
                }
            case 3:
                {
                    let { email } = data;
                    this.C2SSendEmail(email);
                    break;
                }
            case 4:
                {
                    let { serverId, account } = data;
                    this.C2SEnterGame(ws, serverId, account);
                    break;
                }
            case 5:
                {
                    let { nickname, serverId, account, avatar } = data;
                    log(data)
                    this.C2SCreateRole(ws, nickname, serverId, account, avatar);
                    break;
                }
            case 6:
                {
                    this.C2SLogOut(ws);
                    break;
                }
        }
    }
    C2SRegister(ws, email, pwd, check, identifyCode) {
        let code, msg;
        if (this._allUser[email]) {
            code = 3;
            msg = "邮箱已被注册";
        } else if (!this.checkLegal(pwd) || !this.checkLegal(check)) {
            code = 1;
            msg = "账号密码不合规范"
        } else {
            if (this.codeList[email] && identifyCode == this.codeList[email]) {
                code = 0;
                let aObj = new Account(this.userId++, email, pwd);
                this._allUser[email] = aObj;
                msg = "注册成功";
            } else {
                code = 2;
                msg = "验证码错误";
            }
        }
        this.S2CRegister(ws, {
            code,
            msg,
        })
    }
    C2SSendEmail(email) {
        // log("发送邮箱")
        let identifyCode = 111345;
        //let identifyCode = randomNum();
        this.codeList[email] = identifyCode;
        //emailTool(email, identifyCode);
    }
    C2SLogin(ws, account, pwd) {
        let code, msg, data;
        let aObj = this._allUser[account];
        if (!aObj) {
            code = 3;
            msg = "账号不存在";
        } else {
            if (aObj.pwd != pwd) {
                code = 1;
                msg = "密码错误"
            } else if (aObj.isLogin()) {
                code = 2;
                msg = "账号已登录";
            } else {
                code = 0;
                msg = "登录成功";
                aObj.setState(ws);
                data = aObj.packToClient();
            }
        }
        this.S2CLogin(ws, {
            code,
            msg,
            data
        })
    }
    C2SEnterGame(ws, serverId, account) {
        let aObj = this._allUser[account];
        let code = 0,
            msg = "进入游戏";
        let role, info;
        if (aObj) {
            role = aObj.getRole(serverId);
        }
        if (!role) {
            code = 1;
            msg = "当前服务器没有角色"
        } else {
            aObj.curRole = role;
            role.aObj = aObj;
            role.loginIn();
            info = role.packToClient();
        }
        this.S2CEnterGame(ws, { code, msg, role: info, serverId });
    }
    C2SSetName(ws, nickName) {
        let code = 0,
            msg = "起名成功";
        let flag = false;
        for (const key in this._allUser) {
            if (this._allUser[key].nickName == nickName) {
                flag = true;
                break;
            }
        }
        if (ws.account && !flag) {
            ws.account.nickName = nickName
        } else {
            code = 1
            msg = "用户名已存在"
        }
        this.S2CSetName(ws, { nickName, code, msg })
    }
    C2SCreateRole(ws, nickname, serverId, account, avatar) {
        let aObj = this._allUser[account];
        let code, msg, role;
        log(serverId)
        if (aObj) {
            code = 0;
            msg = "创建成功";
            role = aObj.createRole(serverId, this.uId++, avatar, nickname);
            aObj.curRole = role;
            role.aObj = aObj;
            role.loginIn();
        } else {
            code = 1;
            msg = "创建失败"
        }
        this.S2CCreateRole(ws, { code, msg, data: role.packToClient() })
    }
    C2SLogOut(ws) {
        ws.account.loginOut();
    }
    S2CLogin(ws, data) {
        SERVER.send(ws, this.protocol, 1, data)
    }
    S2CRegister(ws, data) {
        SERVER.send(ws, this.protocol, 2, data)
    }
    S2CSetName(ws, data) {
        SERVER.send(ws, this.protocol, 3, data)
    }
    S2CEnterGame(ws, data) {
        SERVER.send(ws, this.protocol, 4, data)
    }
    S2CCreateRole(ws, data) {
        SERVER.send(ws, this.protocol, 5, data)
    }
    S2CStrengthReCover(curStrength) {
        SERVER.send(ws, this.protocol, 6, { curStrength })
    }
    checkLegal(source) {
        if (source.length < 6 || source.length > 12) {
            return false;
        }
        let num = 0;
        for (let element of source) {
            if (element <= '9' && element >= '0') {
                num |= 1;
            } else if (element <= 'Z' && element >= 'A') {
                num |= 2;
            } else if (element <= 'z' && element >= 'a') {
                num |= 4;
            } else {
                return false
            }
        }
        return num & (num - 1);
    }
}

global.ACC_M = new CAccountManager();
module.exports = {
    onmessage(ws, sub, data) {
        ACC_M.onMessage(ws, sub, data)
    }
}