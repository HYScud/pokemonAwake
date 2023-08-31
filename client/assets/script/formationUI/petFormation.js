// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        petNode: cc.Node,
    },

    init(info) {
        let sk = this.petNode.getComponent(sp.Skeleton);
        sk.skeletonData = RES_M.getRes("petSpine", info.icon);
        sk.defaultAnimation = "run_loop";
        sk.setAnimation(0, "run_loop", true);
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.node.script = this;
    },

    start() {

    },

    // update (dt) {},
});