// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        bgmSlider: cc.Slider,
        bgmProgress: cc.ProgressBar,
        bgmImg: cc.Sprite,
        soundSlider: cc.Slider,
        soundProgress: cc.ProgressBar,
        soundImg: cc.Sprite,
    },
    onClick(e, custom) {
        if (custom == "close") {
            this.node.active = false;
        } else if (custom == "exit") {
            cc.director.loadScene("login");
            cc.sys.localStorage.removeItem("login");
            this.C2SLogOut();
        }
    },
    sliderMove(e, custom) {
        if (custom == "bgm") {
            let progress = this.bgmSlider.progress;
            this.bgmProgress.progress = progress;
            this.changeBgm(progress);
        } else if (custom == "sound") {
            let progress = this.soundSlider.progress;
            this.soundProgress.progress = progress;
            this.changeSound(progress);
        }
    },
    changeBgm(progress) {
        if (!progress) {
            this.bgmImg.spriteFrame = RES_M.getRes("settingIcon", "btn_off");
        } else {
            this.bgmImg.spriteFrame = RES_M.getRes("settingIcon", "btn_on");
        }
        Audio_M.setBgm(progress);
    },
    changeSound(progress) {
        if (!progress) {
            this.bgmImg.spriteFrame = RES_M.getRes("settingIcon", "btn_off");
        } else {
            this.bgmImg.spriteFrame = RES_M.getRes("settingIcon", "btn_on");
        }
        Audio_M.setSound(progress);
    },
    C2SLogOut() {
        net.send(NET_PROTOCOL.NET_ACCOUNT, 6);
    },
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },

    // update (dt) {},
});