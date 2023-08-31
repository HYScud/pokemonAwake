// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        menuLayer: cc.Node,
        content: cc.Node,
        menuIndex: 0,
        itemImg: cc.Sprite,
        itemName: cc.Label,
        itemDesc: cc.Label,
    },
    onClick(e, custom) {
        Audio_M.play("click_1", false, "sound");
        if (custom == "close") {
            this.node.active = false;
        }
    },
    initMenu() {
        for (let index = 0; index < this.menuLayer.children.length; index++) {
            let item = this.menuLayer.children[index];
            item.index = index;
            item.on(cc.Node.EventType.TOUCH_START, () => {
                this.menuClick(item);
            })
        }
    },
    initBag(data) {
        this.content.removeAllChildren();
        for (let key in data) {
            let node = cc.instantiate(RES_M.getRes("itemPrefab", "item"));
            node.info = data[key];
            this.content.addChild(node);
            this.addItemLister(node);
            if (!this.selected) {
                this.selected = node;
                this.selected.getChildByName("selected").active = true;
                this.showInfo(node.info);
            }
            node.script.init(data[key]);
        }
    },
    addItemLister(item) {
        item.on(cc.Node.EventType.TOUCH_END, () => {
            this.itemClick(item);
        })
    },
    itemClick(item) {
        if (item.info.itemId == this.selected.info.itemId) {
            return;
        }
        this.selected.getChildByName("selected").active = false;
        this.selected = item;
        this.selected.getChildByName("selected").active = true;
        this.showInfo(item.info);
    },
    showInfo(info) {
        this.itemImg.spriteFrame = RES_M.getRes("itemIcon", info.icon);
        this.itemDesc.string = info.desc;
        this.itemName.string = info.name;
    },
    menuClick(item) {
        if (this.menuIndex == item.item) {
            return;
        }
        this.menuLayer.children[this.menuIndex].getChildByName("selected").active = false;
        this.menuLayer.children[this.menuIndex].getChildByName("unSelected").active = true;
        item.getChildByName("selected").active = true;
        item.getChildByName("unSelected").active = false;
        this.menuIndex = item.index;
    },
    C2SGetAllItem() {
        net.send(this.protocol, 1, { serverId: net.serverId });
    },
    C2SGetItem() {

    },
    onmessage(sub, data) {
        switch (sub) {
            case 1:
                this.S2CGetAllItem(data);
                break;
        }
    },
    S2CGetAllItem(data) {
        console.log("取得数据");
        this.initBag(data)
    },
    onDestroy() {
        Router.targetOff(this);
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.initMenu();
        this.protocol = NET_PROTOCOL.NET_BAG;
        Router.on(this.protocol, (sub, data) => {
            this.onmessage(sub, data);
        }, this)
    },
    onEnable() {
        this.C2SGetAllItem();
    },
    start() {

    },

    // update (dt) {},
});