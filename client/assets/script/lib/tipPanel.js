// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        msgLabel: cc.Label,
        titleLabel: cc.Label,
    },

    init(title, msg, type, func) {
        this.msgLabel.string = msg;
        this.titleLabel.string = title;
    },
    onclick(e, custom) {
        if (custom == "sure") {
            this.node.removeFromParent();
        } else if (custom == "close") {
            this.node.removeFromParent();
        }
    },

    // LIFE-CYCLE CALLBACKS:
    onEnable() {
        Audio_M.play("popupOpen", false, "popup");
    },
    onDestroy() {

    },
    onLoad() {
        this.node.script = this;
    },

    start() {

    },

    // update (dt) {},
});