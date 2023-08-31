// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        allRaceLabel: cc.Label,
        attrLayer: cc.Node,
        lifeLabel: cc.Label,
        speedLabel: cc.Label,
        atkLabel: cc.Label,
        defLabel: cc.Label,
        spAtkLabel: cc.Label,
        spDefLabel: cc.Label,
        levelLabel: cc.Label,
        expProgress: cc.ProgressBar,
        expLabel: cc.Label,
        expItemLayer: cc.Node,
    },

    init(info, itemId) {
        console.log(info);
        this.info = info;
        this.allRaceLabel.string = "种族值：" + info.allRace;
        this.initAttr(info.attr);
        this.lifeLabel.string = "生命：" + info.life;
        this.spAtkLabel.string = "特攻：" + info.spAtk;
        this.speedLabel.string = "速度：" + info.speed;
        this.atkLabel.string = "攻击：" + info.atk;
        this.defLabel.string = "防御：" + info.def;
        this.spDefLabel.string = "特防：" + info.spDef;
        this.expLabel.string = info.curExp + "/" + info.curLevelExp;
        this.expProgress.progress = info.curExp / info.curLevelExp;
        this.levelLabel.string = "等级" + info.level;
        if (itemId)
            this.expItemLayer.script.refresh(itemId);
    },
    initAttr(attr) {
        this.attrLayer.removeAllChildren();
        attr.forEach(element => {
            let node = cc.instantiate(RES_M.getRes("petPrefab", "attr"));
            node.scale = 0.7;
            node.getComponent(cc.Sprite).spriteFrame = RES_M.getRes("skillIcon", element);
            this.attrLayer.addChild(node);
        });
    },
    onClickBtn(e, custom) {
        if (custom == "upgrade") {
            this.expItemLayer.active = true;
        }
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.node.script = this;
    },

    start() {

    },

    // update (dt) {},
});