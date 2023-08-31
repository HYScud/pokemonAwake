// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        layer: cc.Node
    },

    initLevelItem() {
        let levelItem = curPlayer.getLeveLItem();
        for (let key in levelItem) {
            let node = this.layer.getChildByName("item" + key);
            console.log("节点初始化");
            node.item = levelItem[key];
            this.addListen(node);
            node.getChildByName("mask").active = false;
            node.script.init(levelItem[key]);
        }
    },
    onMaskClick(e, custom) {
        let node = cc.instantiate(RES_M.getRes("tip", "tipsPanel"));
        console.log(node);
        let canvas = cc.find("Canvas/petUI");
        canvas.addChild(node);
        let msg = "功能尚未开发";
        let title = "开发中";
        node.script.init(title, msg);
    },
    addListen(node) {
        node.on(cc.Node.EventType.TOUCH_END, () => {
            this.itemClick(node);
        })
    },
    itemClick(node) {
        if (node.item.num > 0) {
            Router.emit(ChangeEvent.useItem, node.item);
        }
    },
    refresh(itemId) {
        let item = curPlayer.getData().bag[itemId];
        let node = this.layer.getChildByName("item" + itemId);
        if (item) {
            node.getChildByName("num").getComponent(cc.Label).string = item.num;
        } else {
            node.getChildByName("num").getComponent(cc.Label).string = 0;
            node.getChildByName("mask").active = true;
        }

    },
    // LIFE-CYCLE CALLBACKS:
    onEnable() {
        this.node.script = this;
        this.initLevelItem();
    },
    // onLoad () {},

    start() {

    },

    // update (dt) {},
});