let RICH_TABLE = {
    R: "<color=#FF0000>",
    G: "<color=#00FF00>",
    N: "</color>",
}
class TipManager {

    formatMsg(msg, data) {
        for (let key in RICH_TABLE) {
            let cur = "#" + key;
            while (msg.indexOf(cur) != -1) {
                msg = msg.replace(cur, RICH_TABLE[key]);
            }
        }

        if (data) {
            //console.log(data)
            for (let key in data) {
                //console.log(data[key])
                let cur = "#{" + key + "}";
                while (msg.indexOf(cur) != -1) {
                    msg = msg.replace(cur, data[key]);
                }
            }
        }
        return msg;
    }

    showMsg(msg, data, pos = cc.v2(0, 0)) {
        let canvas = cc.find("Canvas");
        msg = this.formatMsg(msg, data);
        let layer = canvas.getChildByName("tipsLayer")
        if (!layer) {
            layer = new cc.Node("tipsLayer");
            canvas.addChild(layer);
        }
        let tip = cc.instantiate(RES_M.getRes("tip", "tip"));
        layer.active = true;
        layer.color = cc.Color.BLUE;
        layer.addChild(tip);
        let callBack = () => {
            if (layer.children.length == 0) {
                layer.removeFromParent();
            }
        }
        tip.script.showMsg(msg, pos, callBack);
    }
}
window.g_Tips = new TipManager();