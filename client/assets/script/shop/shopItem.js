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
        icon: cc.Sprite,
        costLabel: cc.Label,
        maskNode: cc.Node,
        btn: cc.Sprite,
        num: cc.Label
    },

    init(key, item) {
        this.item = item;
        this.key = key;
        this.nameLabel.string = item.name;
        this.icon.spriteFrame = RES_M.getRes("itemIcon", item.icon);
        this.num.string = "x" + item.num;
        this.costLabel.string = item.cost;
        if (item.isSellOut) {
            this.maskNode.active = true;
            this.btn.spriteFrame = RES_M.getRes("shopImg", "tag_fragment");
        } else {
            this.maskNode.active = false;
            this.btn.spriteFrame = RES_M.getRes("shopImg", "btn_r_1");
        }
        this.addListen();
    },
    addListen() {
        console.log("添加监听");
        this.node.on(cc.Node.EventType.TOUCH_START, () => {
            this.node.scale = 0.8;
        });
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, () => {
            this.node.scale = 1;
        });
        this.node.on(cc.Node.EventType.TOUCH_END, () => {
            this.node.scale = 1;
            if (curPlayer.getData().coinNum < this.item.cost) {
                let node = cc.instantiate(RES_M.getRes("tip", "tipsPanel"));
                node.script.init("金币不足", "当前金币不足请充值");
                cc.find("Canvas").addChild(node);
                return;
            }
            console.log(this.key);
            if (!this.item.isSellOut) {
                this.C2SBuyGoods();
            }
        });
    },
    C2SBuyGoods() {
        net.send(this.protocol, 2, { key: this.key });
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.protocol = NET_PROTOCOL.NET_SHOP;
        this.node.script = this;
    },

    start() {

    },

    // update (dt) {},
});