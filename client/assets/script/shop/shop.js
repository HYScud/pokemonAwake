// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        contentLayer: cc.Node,
    },

    onClick(e, custom) {
        Audio_M.play("click_1", false, "sound");
        if (custom == "close") {
            this.node.active = false;
        }
    },
    initAllGoods(allGoods) {
        this.contentLayer.removeAllChildren();
        console.log(allGoods);
        for (const key in allGoods) {
            let goodsNode = cc.instantiate(RES_M.getRes("shopPrefab", "shopItem"));
            this.contentLayer.addChild(goodsNode);
            goodsNode.key = key;
            goodsNode.script.init(key, allGoods[key]);
        }
    },
    C2SGetAllGoods() {
        net.send(this.protocol, 1);
    },
    onmessage(sub, data) {
        if (sub == 1) {
            this.S2CGetAllGoods(data);
        } else if (sub == 2) {
            this.S2CBuyGoods(data);
        }
    },
    S2CGetAllGoods(data) {
        console.log(data);
        let { allGoods } = data;
        this.initAllGoods(allGoods);
    },
    S2CBuyGoods(data) {
        console.log(data);
        let { key, goods, bag, money } = data;
        for (const child of this.contentLayer.children) {
            if (child.key == key) {
                console.log(key);
                child.script.init(key, goods);
            }
        }
        curPlayer.getData().bag = bag;
        curPlayer.getData().coinNum = money;
        Router.emit(ChangeEvent.res);
    },
    // LIFE-CYCLE CALLBACKS:
    onDestroy() {
        Router.targetOff(this);
    },
    onEnable() {
        this.C2SGetAllGoods();
    },

    onLoad() {
        this.protocol = NET_PROTOCOL.NET_SHOP;
        this.node.script = this;
        Router.on(this.protocol, (sub, data) => {
            this.onmessage(sub, data);
        }, this)
    },

    start() {

    },

    // update (dt) {},
});