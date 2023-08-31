
class Item7 extends ItemBase.CItemBase {
    constructor(itemId,num) {
        super(itemId,num);
        this.itemId = 7;
        this.name = "哞哞鲜奶";
        this.desc = '可以给精灵食用，增加3000点经验';
        this.icon = 'jy_4';
        this.num = num?num:1;
        this.effectNum= 3000;
        this.type =2;
        this.rankNum = 1;
        this.maxNum=2;
        this.minNum=1;
    }
}
module.exports = Item7
