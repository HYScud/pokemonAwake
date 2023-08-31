// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        frame: cc.Sprite,
        icon: cc.Sprite,
        num: cc.Label,
    },

    init(data) {
        console.log(data);
        this.frame.spriteFrame = RES_M.getRes("boxFrameIcon", "panel_" + data.rankNum);
        this.num.string = data.num;
        this.icon.spriteFrame = RES_M.getRes("itemIcon", data.icon);
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.node.script = this
    },

    start() {

    },

    // update (dt) {},
});