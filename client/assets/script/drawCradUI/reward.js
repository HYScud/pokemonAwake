// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        rewardLayer: cc.Node,
        btnLayer: cc.Node,
        drawBtnLabel: cc.Label,
        btnLayer: cc.Node,
        getReward: cc.Node,
        consumeLabel: cc.Node,
        consumeIcon: cc.Sprite
    },

    initPet(data, num, type, consume) {
        Audio_M.play("card_gain", false, "drawCardSound");
        this.num = num;
        this.type = type;
        this.consume = consume;
        this.initConsume(consume, type);
        this.getReward.active = true;
        this.getReward.getComponent(sp.Skeleton).setAnimation(0, "huode", false);
        this.rewardLayer.active = true;
        this.rewardLayer.removeAllChildren();
        this.btnLayer.active = true;
        this.drawBtnLabel.string = "再抽" + (num == 1 ? num : "十") + "次";
        if (this.rewardLayer)
            this.rewardLayer.width = num * 120;
        for (let petObj of data) {
            let petNode = cc.instantiate(RES_M.getRes("drawCardPrefab", "PetBox"));
            this.rewardLayer.addChild(petNode);
            curPlayer.getData().petBag[petObj.petId] = petObj;
            petNode.script && petNode.script.init(petObj);
        }
    },
    initConsume(consume, type) {
        console.log(consume);
        this.consumeLabel.getComponent(cc.Label).string = consume;
        let curResNum = 0;
        if (type == 1) {
            curResNum = curPlayer.getData().diamondNum;
        } else if (type == 2) {
            curResNum = curPlayer.getData().coinNum;
        }
        if (curResNum < consume) {
            this.consumeLabel.color = new cc.Color(255, 0, 0, 255);
        } else {
            this.consumeLabel.color = new cc.Color(68, 66, 66, 255);
        }
        this.consumeIcon.spriteFrame = RES_M.getRes("resIcon", type == 1 ? "icon_diamond" : "icon_gold");
    },
    onClick(e, custom) {
        Audio_M.play("click_1", false, "sound");
        if (custom == "close") {
            this.node.active = false;
            this.rewardLayer.active = false;
            this.getReward.active = false;
            this.btnLayer.active = false;
        } else if (custom == "again") {
            let consume = this.num == 1 ? 200 : 1800;
            if (curPlayer.getData().diamondNum < consume) {
                console.log("zuanshibuzu")
            } else {
                this.rewardLayer.active = false;
                this.btnLayer.active = false;
                this.getReward.active = false;
                this.node.parent.script.toDrawCard(this.num);
            }
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