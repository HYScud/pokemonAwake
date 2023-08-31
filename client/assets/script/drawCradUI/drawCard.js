// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
let table = {
    0: {
        bg: "img_bg_zxck",
        onceNum: 220,
        tenNum: 2000,
        icon: "icon_diamond",
        type: 1
    },
    1: {
        bg: "img_ck",
        onceNum: 200,
        tenNum: 1800,
        icon: "icon_diamond",
        type: 1
    },
    2: {
        bg: "img_ck_jb",
        onceNum: 20000,
        tenNum: 180000,
        icon: "icon_gold",
        type: 2
    }
}

cc.Class({
    extends: cc.Component,

    properties: {
        menuLayer: cc.Node,
        bgSprite: cc.Sprite,
        menuIndex: 0,
        itemIndex: 0,
        onceNum: cc.RichText,
        onceNumIcon: cc.Sprite,
        tenNum: cc.RichText,
        tenNumIcon: cc.Sprite,
        tenNumTip: cc.Node,
        attrChange: cc.Node,
        drawCardSp: sp.Skeleton,
        //maskLayer: cc.Node
    },

    onClick(e, custom) {
        Audio_M.play("click_1", false, "sound")
        if (custom == "close") {
            this.node.active = false;
        } else if (custom == "once") {
            this.toDrawCard(1);
        } else if (custom == "ten") {
            this.toDrawCard(10);
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
    changePanel() {
        this.bgSprite.spriteFrame = RES_M.getRes("drawCardBg", table[this.menuIndex].bg);
        this.onceNum.string = '' + table[this.menuIndex].onceNum;
        this.onceNumIcon.spriteFrame = RES_M.getRes("resIcon", table[this.menuIndex].icon);
        this.tenNum.string = '' + table[this.menuIndex].tenNum;
        this.tenNumIcon.spriteFrame = RES_M.getRes("resIcon", table[this.menuIndex].icon);
        //this.box.active = this.tenNumTip.active = this.menuIndex < 2;
        //this.attrChange.active = this.menuIndex < 1;
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
        this.changePanel();
    },
    toDrawCard(num) {

        if (this.menuIndex == 1) {
            let consume = num == 1 ? 200 : 1800;
            if (curPlayer.getData().diamondNum >= consume) {
                Audio_M.pauseMusic();
                this.C2SGetDiamondCard(num);
            } else {
                let node = cc.instantiate(RES_M.getRes("tip", "tipsPanel"));
                this.node.addChild(node);
                let msg = "当前钻石不足";
                let title = "钻石不足";
                node.script.init(title, msg);
            }
        } else if (this.menuIndex == 2) {
            this.C2SGetCoinCard();
        } else {
            let consume = num == 1 ? 220 : 200;
            if (curPlayer.getData().diamondNum >= consume) {
                Audio_M.pauseMusic();
                this.C2SGetSelfCard(num);
            } else {
                console.log("zuanshibuzu");
            }
        }
    },
    C2SGetDiamondCard(num) {
        net.send(this.protocol, 1, { num, serverId: net.serverId, type: table[this.menuIndex].type });
    },
    onmessage(sub, data) {
        console.log(sub, data);
        if (sub == 1) {
            this.S2CGetDiamondCard(data);
        }
    },
    S2CGetDiamondCard(data) {
        console.log("11243")
        let { num, rewardList, consume, type } = data;
        this.rewardList = rewardList;
        this.num = num;
        this.type = type;
        this.consume = consume;
        this.drawCardSpine(num);
        curPlayer.getData().diamondNum -= consume;
        Router.emit(ChangeEvent.res, type);
    },
    drawSelfCardSpine() {
        this.drawCardSp.node.active = true;
        //this.maskLayer.active = true;
        let name = num == 1 ? "effect_danchou" : "effect_shilianchou";
        this.drawCardSp.skeletonData = RES_M.getRes("drawCardSpine", "xianshichouka");
        let endFunc = () => {
            this.initPanel();
            this.playSpine(this.drawCardSp, name + "_loop", true)
        }
        this.playSpine(this.drawCardSp, name, false, endFunc);
    },
    drawCardSpine(num) {
        console.log("chouka");
        this.drawCardSp.node.active = true;
        //this.maskLayer.active = true;
        let name = num == 1 ? "danchou" : "shilianchou";
        this.drawCardSp.skeletonData = RES_M.getRes("drawCardSpine", "chouka");
        let endFunc = () => {
            this.initPanel();
            this.playSpine(this.drawCardSp, name + "_loop", true)
        }
        let audioName = num == 1 ? "drawcard_one" : "drawcard_ten";
        Audio_M.play(audioName, false, "drawCardSound");
        this.playSpine(this.drawCardSp, name, false, endFunc);
    },
    initPanel() {
        this.drawCardSp.node.script && this.drawCardSp.node.script.initPet(this.rewardList, this.num, this.type, this.consume);
    },
    playSpine(sk, anim, loop, endFunc) {

        sk.defaultAnimation = anim;
        sk.setAnimation(0, anim, loop);
        sk.setCompleteListener((a, b) => {
            console.log("动画播放结束", anim)
            if (endFunc) endFunc();
        });
        sk.setEventListener((a, b) => {
            console.log("动画shijian结束", anim)
                //if (endFunc) endFunc();
        });
    },
    // LIFE-CYCLE CALLBACKS:
    onDestroy() {
        Router.targetOff(this);
    },
    onLoad() {
        this.node.script = this
        this.protocol = NET_PROTOCOL.NET_DRAWCARD;
        Router.on(this.protocol, (sub, data) => {
            console.log(sub, data);
            this.onmessage(sub, data);
        }, this)
    },

    start() {
        this.initMenu();
        this.rewardList = [];
        this.num = 0;
        this.type = 0;
        this.consume = 0;
    },

    // update (dt) {},
});