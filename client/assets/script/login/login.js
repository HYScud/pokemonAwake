// Learn cc.Class:+,lp--p+
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
cc.Class({
    extends: cc.Component,

    properties: {
        loginLayer: cc.Node,
        accountText: cc.EditBox,
        pwdText: cc.EditBox,
        serverPanel: cc.Node,
        serverNode: cc.Node,
        isLogin: false,
        registerLayer: cc.Node,
        emailText: cc.EditBox,
        sendText: cc.Label,
        time: 60,
        registerPwd: cc.EditBox,
        registerCheck: cc.EditBox,
        codeEdit: cc.EditBox,
        CreateLayer: cc.Node,
        loginngLayer: cc.Node,
        btnClick: true
    },

    onClick(e, custom) {
        if (custom == "toLogin" && this.btnClick) {
            this.btnClick = false;
            Audio_M.play("click_1", false, "sound");
            if (this.isLogin) {
                this.C2SEnterGame(1);
            } else {
                this.ToLogin();
            }
        } else if (custom == "server") {
            commonClick.popupShow(this.serverPanel);
        } else if (custom == "closeServer") {
            this.serverPanel.active = false;
        }
    },
    onPanelClick(e, custom) {
        if (custom == "register") {
            this.registerLayer.active = true
        } else if (custom == "login") {
            this.panelLogin();
        } else if (custom == "close") {
            this.closePanel();
        }
    },
    onClickRegister(e, custom) {
        let email = this.emailText.string;
        if (custom == "send") {
            if (email) {
                if (isEmail(email) && this.time >= 60) {
                    this.sendText.string = this.time + "s"
                    this.schedule(this.timeOut, 1)
                    this.C2SSendEmail(email);
                } else {
                    console.log("请输入邮箱");
                }
            } else {
                console.log("邮箱格式错误");
            }
        } else if (custom == "sure") {
            let code = this.codeEdit.string;
            let pwd = this.registerPwd.string;
            let check = this.registerCheck.string;
            if (code && pwd && check && email && isEmail(email)) {
                this.C2SRegister(email, pwd, check, code);
            }
        } else if (custom == "close") {
            this.registerLayer.active = false;
        }
    },
    timeOut() {
        this.time--;
        this.sendText.string = this.time + "s";
        if (this.time <= 0) {
            this.time = 60;
            this.sendText.string = "发送";
            this.unschedule(this.timeOut);
        }
    },
    closePanel() {
        this.loginLayer.active = false;
    },
    ToLogin() {
        let storage = cc.sys.localStorage.getItem("login");
        if (storage != null) {
            // 从缓存中读取账密直接登陆
            let account = JSON.parse(storage).account;
            let pwd = JSON.parse(storage).pwd;
            this.login(account, pwd);
        } else {
            this.loginLayer.active = true;
        }
    },
    panelLogin() {
        let account = this.accountText.string;
        let pwd = this.pwdText.string;
        if (!account || !pwd) {
            return
        }
        this.login(account, pwd);
    },
    login(account, pwd) {
        this.loginLayer.active = false;
        this.loginngLayer.active = true;
        console.log("关闭");
        this.C2SLogin(account, pwd);
        setTimeout(() => {
            this.logginingCall = true;
            this.disableLogininng();
        }, 600);
    },
    disableLogininng(msg) {
        if (msg) this.msg = msg;
        if (this.logginingCall && this.getAccountInfo) {
            this.logginingCall = false;
            console.log("login关闭")
            this.loginngLayer.active = false;
            if (this.isLogin) {
                this.loginLayer.active = false;
                this.serverNode.active = true;
                g_Tips.showMsg(this.msg);
            } else {
                this.loginLayer.active = true;
                g_Tips.showMsg(this.msg);
            }
        }
    },
    onmessage(sub, tData) {
        let { code, msg, data } = tData
        if (sub == 1) {
            this.S2CLogin(code, msg, data);
        } else if (sub == 2) {
            this.S2CRegister(code, msg);
        } else if (sub == 4) {
            this.S2CEnterGame(tData);
        }
    },
    C2SLogin(account, pwd) {
        net.send(this.protocol, 1, { account, pwd });
    },
    C2SRegister(email, pwd, check, code) {
        net.send(this.protocol, 2, { email, pwd, check, code });
    },
    C2SSendEmail(email) {
        net.send(this.protocol, 3, { email });
    },
    C2SEnterGame(serverId) {
        net.send(this.protocol, 4, { serverId, account: net.account });
    },
    S2CLogin(code, msg, data) {
        this.btnClick = true;
        if (code == 0) {
            let { account } = data;
            net.account = account;
            this.isLogin = true;
            let storage = { account, pwd: this.pwdText.string };
            cc.sys.localStorage.setItem("login", JSON.stringify(storage));
        }
        this.getAccountInfo = true;
        this.btnClick = true;
        this.disableLogininng(msg);
    },
    S2CRegister(code, msg) {
        if (code == 0) {
            this.registerLayer.active = false;
        } else {
            g_Tips.showMsg(msg);
        }
    },
    S2CEnterGame(data) {
        let { code, msg, role, serverId } = data;
        net.serverId = serverId;
        if (code != 0) {
            this.CreateLayer.active = true;
        } else {
            this.toHall(role);
        }
    },

    toHall(data) {
        this.addLoad(data);
    },
    addLoad(data) {
        let node = cc.instantiate(RES_M.getRes("loadPrefab", "loading"));
        node.getChildByName("bg").getComponent(cc.Sprite).spriteFrame = RES_M.getRes("loadImg", "bg_1");
        this.node.parent.addChild(node);
        curPlayer.setData(data);
        node.script && node.script.initLoad("main", "hall");
    },
    // LIFE-CYCLE CALLBACKS:
    onDestroy() {
        Router.targetOff(this);
        this.unschedule(this.timeOut);
    },
    onLoad() {
        this.protocol = NET_PROTOCOL.NET_ACCOUNT
        Router.on(this.protocol, (sub, data) => {
            this.onmessage(sub, data);
        }, this)
    },

    start() {
        Audio_M.playMusic("default", true, "loadSound");
    },

    // update (dt) {},
});