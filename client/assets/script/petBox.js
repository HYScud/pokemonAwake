// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        qualityIcon: cc.Sprite,
        levelLabel: cc.Label,
        petImg: cc.Sprite,
        starLayer: cc.Node,
        boxBg: cc.Sprite,
        frame: cc.Sprite,
    },
    init(pet) {
        this.boxBg.spriteFrame = RES_M.getRes("boxFrameIcon", "panel_" + pet.rankNum);
        this.frame.spriteFrame = RES_M.getRes("boxFrameIcon", "panel_f" + pet.rankNum)
        this.petImg.spriteFrame = RES_M.getRes("petIconBox", pet.icon);
        this.qualityIcon.spriteFrame = RES_M.getRes("qualityIcon", pet.quality);
        this.levelLabel.string = pet.level;
        initStar(this.starLayer, pet.starLevel);
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.node.script = this;
    },

    start() {

    },

    // update (dt) {},
});