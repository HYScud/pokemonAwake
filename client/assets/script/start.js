// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {},

    addLoad() {
        let node = cc.instantiate(RES_M.getRes("loadPrefab", "loading"));
        node.getChildByName("bg").getComponent(cc.Sprite).spriteFrame = RES_M.getRes("loadImg", "bg_1");
        this.node.parent.addChild(node);
        node.script && node.script.initLoad("login", "login");
    },
    loadRes(key) {
        RES_M.startLoad(key);
        this.totalNum = RES_M.getLoadResNum();
    },
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.loadRes("start");
        this.node.runAction(cc.sequence(
            cc.fadeOut(1),
            cc.callFunc(() => {
                this.addLoad();
            })
        ))
    },

    // update(dt) {
    //     let unLoadedNum = RES_M.getLoadResNum();
    //     let pro = this.totalNum - unLoadedNum / this.totalNum
    //     console.log(pro)
    // },
});