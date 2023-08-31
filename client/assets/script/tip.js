cc.Class({
    extends: cc.Component,

    properties: {
        tipLabel: cc.RichText
    },

    showMsg(msg, pos, callBack) {
        this.tipLabel.string = msg;
        this.node.setPosition(pos);
        this.node.runAction(
            cc.sequence(
                cc.spawn(
                    cc.moveBy(2.0, 0, 100),
                    cc.fadeOut(2),
                ),
                cc.callFunc(() => {
                    this.node.removeFromParent();
                    callBack();
                })
            )
        );
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.node.script = this;
    },

    start() {

    },

    // update (dt) {},
});