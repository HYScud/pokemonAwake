
class Item9 extends ItemBase.CItemBase {
    constructor(itemId,num) {
        super(itemId,num);
        this.itemId = 9;
        this.name = "椰汁牛奶";
        this.desc = '可以给精灵食用，增加50000点经验';
        this.icon = 'jy_6';
        this.num = num?num:1;
        this.effectNum= 50000;
        this.type =2;
        this.rankNum = 1;
        this.maxNum=2;
        this.minNum=1;
    }
}
module.exports = Item9
