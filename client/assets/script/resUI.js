// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        coinLabel: cc.Label,
        diamondLabel: cc.Label,
        strengthLabel: cc.RichText,
        maxStrengthLabel: cc.Label
    },

    init() {
        this.coinLabel.string = formateNum(curPlayer.getData().coinNum);
        this.diamondLabel.string = formateNum(curPlayer.getData().diamondNum);
        if (this.strengthLabel) {
            this.strengthLabel.string = formateStrength(curPlayer.getData().curStrength, curPlayer.getData().maxStrength);
            this.maxStrengthLabel.string = "/" + curPlayer.getData().maxStrength;
        }
    },
    onDestroy() {
        Router.targetOff(this);
    },
    // LIFE-CYCLE CALLBACKS:
    onEnable() {
        this.init();
    },
    onLoad() {
        this.node.script = this;
        Router.on(ChangeEvent.res, (data) => {
            this.init();
        }, this)
    },

    start() {

    },

    // update (dt) {},
});