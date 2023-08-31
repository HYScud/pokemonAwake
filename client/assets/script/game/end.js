// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        wonLayer: cc.Node,
        lossLayer: cc.Node,
        settlementBg: sp.Skeleton,
        settlementLabel: sp.Skeleton,
        condition2: cc.Node,
        condition3: cc.Node,
        levelLabel: cc.Label,
        petLayer: cc.Node,
        itemLayer: cc.Node,
        endBg: cc.Sprite
    },
    onclick(e, custom) {
        console.log("点击", custom);
        Audio_M.play("click_1", false, "sound");
        if (custom == "main") {
            console.log("tiaozhuang");
            cc.director.loadScene("hall");
        }
    },
    init(won, curTeam, itemList, fillRound, fillDead, roleInfo, getExp) {
        curPlayer.setData(roleInfo);
        if (won) {
            this.wonInit(curTeam, itemList, fillRound, fillDead, roleInfo, getExp);
        } else {
            this.lossInit(roleInfo);
        }
    },
    wonInit(curTeam, itemList, fillRound, fillDead, roleInfo, getExp) {
        this.wonLayer.active = true;
        this.lossLayer.active = false;
        if (!fillRound) {
            this.condition2.getComponentInChildren(cc.Sprite).spriteFrame = RES_M.getRes("starIcon", "icon_star2_d");
        }
        if (fillDead) {
            this.condition3.getComponentInChildren(cc.Sprite).spriteFrame = RES_M.getRes("starIcon", "icon_star2_d");
        }
        this.levelLabel.string = roleInfo.level;
        this.initTeam(curTeam);
        this.initItem(itemList);
        Audio_M.play("gate_win", false, "battleSound");
    },
    lossInit() {
        Audio_M.play("battle_false", false, "battleSound");
        this.wonLayer.active = false;
        this.lossLayer.active = true;
        this.endBg.spriteFrame = RES_M.getRes("end", "loss_bg");
        this.settlementBg.setAnimation(0, "jiesuan_shibaitu_loop");
        this.settlementLabel.setAnimation(0, "jiesuan_shibaizi", true);
    },
    initItem(itemList) {
        for (let item of itemList) {
            let itemNode = cc.instantiate(RES_M.getRes("itemPrefab", "item"));
            this.initItemBox(itemNode, item);
            this.itemLayer.addChild(itemNode);
        }
    },
    initTeam(curTeam) {
        for (let pet of curTeam) {
            let petItem = cc.instantiate(RES_M.getRes("petPrefab", "petBox"));
            this.petLayer.addChild(petItem);
            petItem.scale = 0.5;
            petItem.script.init(pet);
        }
    },
    initItemBox(itemNode, item) {
        itemNode.getComponent(cc.Sprite).spriteFrame = RES_M.getRes("boxFrameIcon", "panel_" + item.rankNum);
        itemNode.getChildByName("frame").getComponent(cc.Sprite).spriteFrame = RES_M.getRes("boxFrameIcon", "panel_f" + item.rankNum);
        itemNode.getChildByName("icon").getComponent(cc.Sprite).spriteFrame = RES_M.getRes("itemIcon", item.icon);
        itemNode.getChildByName("num").getComponent(cc.Label).string = item.num;
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.node.script = this;
    },

    start() {

    },

    // update (dt) {},
});