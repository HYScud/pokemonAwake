
class Itemundefined extends ItemBase.CItemBase {
    constructor(itemId,num) {
        super(itemId,num);
        this.itemId = undefined;
        this.name = "荧绿水元晶石";
        this.desc = '蕴藏元素之力，提升精灵品质至绿色及绿色+1的必备材料之一';
        this.icon = 'icon_walter_green';
        this.num = num?num:1;
        this.effectNum= 0;
        this.type =1;
        this.rankNum = 1;
        this.maxNum=2;
        this.minNum=1;
    }
}
module.exports = Itemundefined
