
class Item3 extends ItemBase.CItemBase {
    constructor(itemId,num) {
        super(itemId,num);
        this.itemId = 3;
        this.name = "金币";
        this.desc = '任何时候都不可少的东西';
        this.icon = '3';
        this.num = num?num:1;
        this.effectNum= 1;
        this.type =-1;
        this.rankNum = 3;
        this.maxNum=1500;
        this.minNum=1000;
    }
}
module.exports = Item3
