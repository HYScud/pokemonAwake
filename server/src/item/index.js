class CItemBase {
    constructor() {
        this.itemId = 0;
        this.name = "";
        this.desc = "";
        this.icon = "";
        this.num = 1;
        this.effectNum = 0; //作用的量
        this.type = 0;
        this.rankNum = 0;
        this.maxNum = 0;
        this.minNum = 0;
    }
    packToClient() {
        return {
            itemId: this.itemId,
            name: this.name,
            desc: this.desc,
            icon: this.icon,
            num: this.num,
            effectNum: this.effectNum,
            type: this.type,
            rankNum: this.rankNum
        }
    }
}
let allItem = null;
module.exports = {
    CItemBase: CItemBase,
    createItem(id, num) {
        allItem = allItem || require("./load")
        return new allItem[id](id, num);
    }
}