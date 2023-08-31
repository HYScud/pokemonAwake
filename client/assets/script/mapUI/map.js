cc.Class({
    extends: cc.Component,

    properties: {
        //mapBg: cc.Node,
        infoLayer: cc.Node
    },

    onClick(e, custom) {
        Audio_M.play("click_1", false, "sound");
        if (custom == "close") {
            this.node.active = false;
        }
    },
    init(Round) {
        for (let roundIndex in Round) {
            if (!Round[roundIndex].completed) {
                //this.mapBg = Round[roundIndex].map;
                this.initLevel(Round[roundIndex].list, Round[roundIndex].index);
                break;
            }
        }
    },
    initLevel(list, index) {
        console.log(index)
        for (let i = 0; i < list.length && i <= index; i++) {
            let node = this.levelLayer.children[i];
            let path = this.pathLayer.children[i];
            node.active = true;
            node.info = list[i];
            this.addListener(node);
            if (i != index) {
                path.active = true;
            }
            if (list[i].type != 0) {
                node.getChildByName("icon_boss").getChildByName("icon").getComponent(cc.Sprite).spriteFrame = RES_M.getRes("petIconRank", list[i].boss.icon);
                //node.getChildByName("icon_boss").getComponent(cc.SpriteFrame).spriteFrame = RES_M.getRes("starIcon", "icon_rank_star")
            }
            initBattleStar(node.getChildByName("starLayer"), list[i].star, "icon_rank_star");
            if (list[i].star == 0)
                break;
        }
    },
    addListener(parent) {
        for (let node of parent.children) {
            node.on(cc.Node.EventType.TOUCH_END, () => {
                this.onClickLevel(node);
            })
        }
    },
    onClickLevel(node) {
        this.infoLayer.active = true;
        this.infoLayer.script.init(node.parent.info);
    },
    C2SGetMap() {
        net.send(this.protocol, 1, { serverId: net.serverId });
    },
    S2CGetMap(tData) {
        console.log(tData);
        let { data, curIndex } = tData;
        console.log(data, curIndex);
        this.levelLayer = cc.find(`roundLayer/round${curIndex}/levelLayer`, this.node);
        this.pathLayer = cc.find(`roundLayer/round${curIndex}/pathLayer`, this.node);
        this.init(data);
    },
    onmessage(sub, data) {
        switch (sub) {
            case 1:
                this.S2CGetMap(data);
                break;
        }
    },
    onEnable() {
        this.C2SGetMap();
    },
    onDestroy() {
        Router.targetOff(this);
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.protocol = NET_PROTOCOL.NET_MAP;
        Router.on(this.protocol, (sub, data) => {
            this.onmessage(sub, data);
        }, this);
    },

    start() {

    },

    // update (dt) {},
});