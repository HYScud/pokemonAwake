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
        numRichText: cc.RichText,
        mask: cc.Node
    },
    initRankItem(data) {
        this.node.getComponent(cc.Sprite).spriteFrame = RES_M.getRes("boxFrameIcon", "panel_f" + data.rankNum);
        this.frame.spriteFrame = RES_M.getRes("boxFrameIcon", "panel_" + data.rankNum);
        this.icon.spriteFrame = RES_M.getRes("itemIcon", data.icon);
        let playerItem = curPlayer.getData().bag[data.itemId];
        if (!playerItem || playerItem.num < data.num) {
            this.node.isFilled = false;
            this.mask.active = true;
        } else {
            this.node.isFilled = true;
            this.mask.active = false;
        }
        let num = 0;
        if (playerItem) num = playerItem.num;
        this.numRichText.string = formatColorNum(num, data.num) + `<color=#FFFFFF>/${data.num}</c>`;
    },

    onLoad() {
        this.node.script = this;
    },

    start() {

    },

    // update (dt) {},
});