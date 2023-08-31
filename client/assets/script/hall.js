// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        petUI: cc.Node,
        petBagUI: cc.Node,
        mapUI: cc.Node,
        petUI: cc.Node,
        drawCardUI: cc.Node,
        bagUI: cc.Node,
        personalUI: cc.Node,
        formationUI: cc.Node,
        powerLabel: cc.Label,
        vipLabel: cc.Label,
        levelLabel: cc.Label,
        avatar: cc.Sprite,
        nameLabel: cc.Label,
        coinLabel: cc.Label,
        diamondLabel: cc.Label,
        strengthLabel: cc.RichText,
        allStrLabel: cc.Label,
        settingLayer: cc.Node,
        shopUI: cc.Node
    },
    init() {
        Audio_M.playMusic("city", true, "mainSound");
        let data = curPlayer.getData();
        this.initInfo(data);
        this.initRes(data);
    },
    initInfo(data) {
        this.avatar.spriteFrame = RES_M.getRes("avatar", data.avatar);
        console.log(this.avatar.spriteFrame)
        this.powerLabel.string = "战：" + data.power;
        this.vipLabel.string = "vip" + data.vipLevel;
        this.levelLabel.string = data.level;
        this.nameLabel.string = data.nickname;
    },
    initRes(data) {
        console.log(data);
        this.coinLabel.string = formateNum(data.coinNum);
        this.diamondLabel.string = formateNum(data.diamondNum);
        this.strengthLabel.string = formateStrength(data.curStrength, data.maxStrength);
        this.allStrLabel.string = "/" + data.maxStrength;
    },
    onClickUI(e, custom) {
        console.log(custom);
        Audio_M.play("click_1", false, "sound");
        if (custom == "bag") {
            this.bagUI.active = true;
        } else if (custom == "drawCard") {
            this.drawCardUI.active = true;
        } else if (custom == "pet") {
            this.petUI.active = true;
        } else if (custom == "map") {
            this.mapUI.active = true;
        } else if (custom == "personal") {
            this.personalUI.active = true;
        } else if (custom == "formation") {
            this.formationUI.active = true;
        } else if (custom == "shop") {
            console.log("zhix", this.shopUI)
            this.shopUI.active = true;
        }
    },
    onClickBtn(e, custom) {
        if (custom == "setting") {
            this.settingLayer.active = true;
        }
    },
    onmessage(sub, data) {
        if (sub == 1) {
            this.S2CStrengthRecover(data);
        }
    },
    S2CStrengthRecover(data) {
        let { curStrength } = data;
        curPlayer.getData().curStrength = curStrength;
        console.log("通知更新", curPlayer.getData().curStrength);
        Router.emit(ChangeEvent.res);
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.protocol = NET_PROTOCOL.NET_HALL;
        Router.on(this.protocol, (sub, data) => {
            this.onmessage(sub, data);
        })
    },

    start() {
        RES_M.startLoad("drawCard");
        this.init();
    },

    // update (dt) {},
});