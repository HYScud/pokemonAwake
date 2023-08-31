// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        petBox: cc.Node,
        breachLayer: cc.Node,
    },

    init(info) {
        this.pet = info;
        this.petBox.script.init(info);
        let rankNumItemList = rankNumTable[info.rankNum];
        this.initItem(rankNumItemList);
    },
    initItem(rankNumItemList) {
        for (let index = 0; index < this.breachLayer.children.length; index++) {
            let child = this.breachLayer.children[index];
            child.script.initRankItem(rankNumItemList[index]);
        }
    },
    onClick(e, custom) {
        if (custom == "rush") {
            if (this.check()) {
                this.C2SRushRankNum();
            } else {
                let node = cc.instantiate(RES_M.getRes("tip", "tipsPanel"));
                console.log(node);
                let canvas = cc.find("Canvas/petUI");
                canvas.addChild(node);
                let msg = "突破资源不足";
                let title = "资源不足";
                node.script.init(title, msg);
            }
        }
    },
    check() {
        let flag = true;
        for (let index = 0; index < this.breachLayer.children.length; index++) {
            if (!this.breachLayer.children[index].isFilled) {
                flag = false;
            }
        }
        return flag;
    },

    C2SRushRankNum() {
        net.send(this.protocol, 3, { petId: this.pet.petId });
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.protocol = NET_PROTOCOL.NET_HALL;
        this.node.script = this;
    },

    start() {

    },

    // update (dt) {},
});