
class Item2 extends ItemBase.CItemBase {
    constructor(itemId,num) {
        super(itemId,num);
        this.itemId = 2;
        this.name = "能量核心";
        this.desc = '精灵突破的必备道具';
        this.icon = '2';
        this.num = num?num:1;
        this.effectNum= 0;
        this.type =1;
        this.rankNum = 2;
        this.maxNum=3;
        this.minNum=1;
    }
}
module.exports = Item2
