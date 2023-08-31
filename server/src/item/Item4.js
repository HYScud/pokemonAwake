
class Item4 extends ItemBase.CItemBase {
    constructor(itemId,num) {
        super(itemId,num);
        this.itemId = 4;
        this.name = "甘甜冰水";
        this.desc = '可以给精灵食用，增加100点经验';
        this.icon = 'jy_1';
        this.num = num?num:1;
        this.effectNum= 100;
        this.type =2;
        this.rankNum = 1;
        this.maxNum=2;
        this.minNum=1;
    }
}
module.exports = Item4
