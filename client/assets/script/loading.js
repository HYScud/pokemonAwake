// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        loadKey: "",
        loadSuccess: false,
        progressBar: cc.ProgressBar,
        totalNum: 0,
        sceneName: "",
        progressText: cc.Label,
        effect: cc.Node,
    },

    initLoad(loadKey, scene) {
        console.log("1", loadKey)
        this.loadKey = loadKey;
        this.sceneName = scene;
    },

    initGetBattleInfo(loadKey, scene, roundInfo) {
        this.loadKey = loadKey;
        this.sceneName = scene;
        let { id, key } = roundInfo;
        this.C2SGetBattleInfo(key, id)
    },
    C2SGetBattleInfo(roundKey, roundId) {
        net.send(this.protocol, 1, { roundKey, roundId, serverId: net.serverId })
    },
    onmessage(sub, data) {
        switch (sub) {
            case 1:
                this.S2CGetBattleInfo(data);
                break;
        }
    },
    S2CGetBattleInfo(data) {
        this.data = data;
    },
    onLoad() {
        this.node.script = this
    },
    onDestroy() {
        Router.targetOff(this);
    },
    onLoad() {
        Audio_M.stopAll();
        this.node.script = this;
        this.protocol = NET_PROTOCOL.NET_LOAD;
        Router.on(this.protocol, (sub, data) => {
            this.onmessage(sub, data);
        }, this);
    },
    // LIFE-CYCLE CALLBACKS:
    start() {
        RES_M.startLoad(this.loadKey);
        this.progressBar.progress = 0;
        this.totalNum = RES_M.getLoadResNum();
        console.log(this.loadKey, this.totalNum, "总数");
    },

    update(dt) {
        if (!this.loadSuccess) {
            let unLoadedNum = RES_M.getLoadResNum();
            let pro = (this.totalNum - unLoadedNum) / this.totalNum;
            if (this.progressBar.progress < 1) {
                this.progressBar.progress = pro;
                this.progressBar.progress = Math.min(1, this.progressBar.progress);
                if (this.progressBar.progress >= 1) {
                    this.loadSuccess = true;
                    let data = this.data;
                    cc.director.loadScene(this.sceneName, () => {
                        if (data) {
                            cc.find("Canvas/bg").getComponent("game").initEnemy(data);
                        }
                    })
                } else {
                    this.effect.x = 880 * pro;
                    this.progressText.string = (this.progressBar.progress * 100).toFixed(0) + "%";
                }
            }
        }
    },

});