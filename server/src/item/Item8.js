
class Item8 extends ItemBase.CItemBase {
    constructor(itemId,num) {
        super(itemId,num);
        this.itemId = 8;
        this.name = "果汁牛奶";
        this.desc = '可以给精灵食用，增加10000点经验';
        this.icon = 'jy_5';
        this.num = num?num:1;
        this.effectNum= 10000;
        this.type =2;
        this.rankNum = 1;
        this.maxNum=2;
        this.minNum=1;
    }
}
module.exports = Item8
