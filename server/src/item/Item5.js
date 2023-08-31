
class Item5 extends ItemBase.CItemBase {
    constructor(itemId,num) {
        super(itemId,num);
        this.itemId = 5;
        this.name = "浸爽汽水";
        this.desc = '可以给精灵食用，增加300点经验';
        this.icon = 'jy_2';
        this.num = num?num:1;
        this.effectNum= 300;
        this.type =2;
        this.rankNum = 1;
        this.maxNum=2;
        this.minNum=1;
    }
}
module.exports = Item5
