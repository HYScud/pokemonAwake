
class Item6 extends ItemBase.CItemBase {
    constructor(itemId,num) {
        super(itemId,num);
        this.itemId = 6;
        this.name = "美味汽水";
        this.desc = '可以给精灵食用，增加1000点经验';
        this.icon = 'jy_3';
        this.num = num?num:1;
        this.effectNum= 1000;
        this.type =2;
        this.rankNum = 1;
        this.maxNum=2;
        this.minNum=1;
    }
}
module.exports = Item6
