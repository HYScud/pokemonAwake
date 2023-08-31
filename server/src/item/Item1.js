
class Item1 extends ItemBase.CItemBase {
    constructor(itemId,num) {
        super(itemId,num);
        this.itemId = 1;
        this.name = "便宜零件";
        this.desc = '能卖出500金币';
        this.icon = '1';
        this.num = num?num:1;
        this.effectNum= 500;
        this.type =1;
        this.rankNum = 0;
        this.maxNum=3;
        this.minNum=1;
    }
}
module.exports = Item1
