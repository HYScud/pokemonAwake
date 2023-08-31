let ejsExcel = require('ejsexcel')
let fs = require('fs')
let excelBuff = fs.readFileSync("../../道具表.xlsx");
console.log(excelBuff)
ejsExcel.getExcelArr(excelBuff).then(excelJson => {
    let itemArr = excelJson[0];
    let load = `module.exports = {`;
    for (let index = 1; index < itemArr.length; index++) {
        let list = itemArr[index];
        load += `${list[0]}:require("./Item${list[0]}"),`
        let code = `
class Item${list[0]} extends ItemBase.CItemBase {
    constructor(itemId,num) {
        super(itemId,num);
        this.itemId = ${list[0]};
        this.name = "${list[1]}";
        this.desc = '${list[2]}';
        this.icon = '${list[3]}';
        this.num = num?num:${list[4]};
        this.effectNum= ${list[5]};
        this.type =${list[6]};
        this.rankNum = ${list[7]};
        this.maxNum=${list[8]};
        this.minNum=${list[9]};
    }
}
module.exports = Item${list[0]}
`
        fs.writeFileSync(`../Item/Item${list[0]}.js`, code)
    }
    load += "}";
    fs.writeFileSync(`../Item/load.js`, load)
}).catch(err => {
    console.log(err)
});