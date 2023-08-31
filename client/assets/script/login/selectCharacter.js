// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        roleLayer: cc.Node,
        nameBox: cc.EditBox,
    },

    onSelect(node) {
        if (node.id == this.selected.id) {
            return;
        }
        let track = this.playSpine(this.selected, "weixuanzhong", false);
        this.listener(track, "weixuanzhong", this.selected);
        this.selected = node;
        this.playSpine(this.selected, "standby_loop2", true);
    },
    playSpine(node, animName, loop) {
        let spine = node.getChildByName("role").getComponent(sp.Skeleton);
        let track = spine.setAnimation(0, animName, loop);
        return track;
    },
    listener(track, animName, node) {
        let spine = node.getChildByName("role").getComponent(sp.Skeleton);
        if (track) {
            // 注册动画的结束回调
            spine.setCompleteListener((trackEntry, loopCount) => {
                let name = trackEntry.animation ? trackEntry.animation.name : '';
                if (name === animName) {
                    this.playSpine(node, "standby_loop1", true);
                }
            });
        }
    },
    initBtn() {
        for (let index = 0; index < this.roleLayer.children.length; index++) {
            let node = this.roleLayer.children[index];
            node.id = index;
            node.on(cc.Node.EventType.TOUCH_START, () => {
                this.onSelect(node);
            })
            if (!this.selected) {
                this.selected = node;
                let anim = this.selected.getChildByName("role").getComponent(sp.Skeleton);
                anim.setAnimation(0, "standby_loop2", true);
            }
        }
    },
    onClick(e, custom) {
        Audio_M.play("click_1", false, "sound");
        if (custom == "random") {
            this.randomName();
        } else if (custom == "sure" && !this.sureClicked) {
            this.sureClicked = true;
            this.toSend();
        }
    },
    randomName() {

    },
    toSend() {
        if (this.nameBox.string) {
            this.C2SCreateRole(net.account, this.nameBox.string, "1");
        } else {
            this.sureClicked = false;
        }
    },
    onmessage(sub, tData) {
        let { code, msg, data } = tData;
        if (sub == 5) {
            this.S2CCreateRole(code, msg, data);
        }
    },
    C2SCreateRole(account, nickname, avatar) {
        net.send(this.protocol, 5, { account, nickname, avatar, serverId: net.serverId });
    },
    S2CCreateRole(code, msg, data) {
        if (code == 0) {
            this.toHall(data);
        }
        this.sureClicked = false;
    },
    toHall(data) {
        // cc.director.loadScene("hall", () => {
        //     cc.find("Canvas/mainUI").getComponent("hall").init(data);
        // })
        this.addLoad(data);
    },
    addLoad(data) {
        let node = cc.instantiate(RES_M.getRes("loadPrefab", "loading"));
        node.getChildByName("bg").getComponent(cc.Sprite).spriteFrame = RES_M.getRes("loadImg", "bg_1");
        this.node.parent.addChild(node);
        curPlayer.setData(data);
        node.script && node.script.initLoad("main", "hall");
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.protocol = NET_PROTOCOL.NET_ACCOUNT;
        Router.on(this.protocol, (sub, data) => {
            this.onmessage(sub, data);
        }, this)
    },

    start() {
        this.initBtn();
    },

    // update (dt) {},
});