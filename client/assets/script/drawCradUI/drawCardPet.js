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
        bg: cc.Sprite,
        starLayer: cc.Node,
        petName: cc.Label,
        icon: cc.Sprite
    },

    init(info) {
        this.frame.spriteFrame = RES_M.getRes("boxFrameIcon", "panel_f" + info.quality);
        this.bg.spriteFrame = RES_M.getRes("boxFrameIcon", "panel_" + info.quality);
        this.petName.string = info.name;
        this.icon.spriteFrame = RES_M.getRes("petIconBox", info.icon);
        initStar(this.starLayer, info.starLevel);
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.node.script = this;
    },

    start() {

    },

    // update (dt) {},
});