// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        nameLabel: cc.Label,
        uIdLabel: cc.Label,
        levelLabel: cc.Label,
        powerLabel: cc.Label,
        avatar: cc.Sprite,
        expProgress: cc.ProgressBar,
        expRichText: cc.RichText,
        groupLayer: cc.Node,
    },
    onClick(e, custom) {
        Audio_M.play("click_1", false, "sound");
        if (custom == "close") {
            this.node.active = false;
        }
    },
    init(data) {
        this.avatar.spriteFrame = RES_M.getRes("avatar", data.avatar);
        this.powerLabel.string = data.power;
        this.levelLabel.string = data.level;
        this.nameLabel.string = data.nickname;
        this.expProgress.progress = data.curExp / data.curLevelExp;
        this.expRichText.string = `<color=#00ff00>${data.curExp}</c>/<color=#0fffff>${data.curLevelExp}</color>`;
        this.initCurTeam(data.curTeam);
    },
    initCurTeam(curTeam) {
        for (const key in curTeam) {
            let node = cc.instantiate(RES_M.getRes("petPrefab", "petBox"));
            this.groupLayer.addChild(node);
            node.scale = 0.4;
            node.script.init(curTeam[key]);
        }
    },
    // LIFE-CYCLE CALLBACKS:
    onDisable() {
        this.groupLayer.removeAllChildren();
    },
    onEnable() {
        let data = curPlayer.getData();
        this.init(data);
    },
    // onLoad () {},

    start() {

    },

    // update (dt) {},
});