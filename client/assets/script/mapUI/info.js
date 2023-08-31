// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        starLayer: cc.Node,
        itemLayer: cc.Node,
        //sweepTenNode: cc.Node,
        sweepNode: cc.Node,
        enemyLayer: cc.Node,
        petImg: cc.Sprite,
        idLabel: cc.Label,
        nameLabel: cc.Label,
    },
    onClick(e, custom) {
        Audio_M.play("click_1", false, "sound");
        if (custom == "close") {
            this.node.active = false;
        } else if (custom == "game") {
            if (this.selected) {
                let data = this.selected;
                this.addLoad(data);
            }
        }
    },
    addLoad(data) {
        let node = cc.instantiate(RES_M.getRes("loadPrefab", "loading"))
        node.getChildByName("bg").getComponent(cc.Sprite).spriteFrame = RES_M.getRes("loadImg", "bg_1")
        this.node.parent.parent.addChild(node);
        //Audio_M.play("default", true, "loadSound");
        node.script && node.script.initGetBattleInfo("battle", "game", data);
    },
    init(info) {
        console.log("初始化", info)
        this.selected = info;
        this.petImg.spriteFrame = RES_M.getRes("petIconBag", info.boss.icon);
        console.log(info.itemList);
        // TODO:道具
        this.idLabel.string = info.index;
        this.nameLabel.string = info.name;
        //this.sweepTenNode.active = 
        this.sweepNode.active = info.star == 3;
        this.initStar(info.star);
        this.initItemLayer(info.itemList);
        this.initEnemyLayer(info.monsterList);
    },
    initEnemyLayer(list) {
        console.log(list)
        let enemyList = list[list.length - 1];
        this.enemyLayer.removeAllChildren();
        for (let index = 0; index < enemyList.length && index < 3; index++) {
            let enemy = cc.instantiate(RES_M.getRes("petPrefab", "petBox"));
            // this.initEnemy(enemy, enemyList[index]);
            this.enemyLayer.addChild(enemy);
            enemy.script.init(enemyList[index]);
            if (index == 0) {
                enemy.scale = 0.6;
            } else {
                enemy.scale = 0.5;
            }

        }
    },
    initItemLayer(itemList) {
        this.itemLayer.removeAllChildren();
        for (let index = 0; index < 2; index++) {
            let itemNode = cc.instantiate(RES_M.getRes("itemPrefab", "item"));
            this.itemLayer.addChild(itemNode);
            itemNode.script.init(itemList[index]);
        }
    },
    initStar(starNum) {
        initBattleStar(this.starLayer, starNum, "icon_star2");
    },
    // LIFE-CYCLE CALLBACKS:
    onEnable() {
        Audio_M.play("show", false, "popup");
    },
    onDisable() {
        Audio_M.play("popupClose", false, "popup");
    },
    onLoad() {
        this.node.script = this;
    },

    start() {},

    // update (dt) {},
});