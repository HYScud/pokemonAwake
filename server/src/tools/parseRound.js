let ejsExcel = require('ejsexcel')
let fs = require('fs')
let excelBuff = fs.readFileSync("../../关卡表.xlsx");
console.log(excelBuff)
ejsExcel.getExcelArr(excelBuff).then(excelJson => {
    let itemArr = excelJson[0];
    let load = `module.exports = {`;
    for (let index = 1; index < itemArr.length; index++) {
        let list = itemArr[index];
        load += `${list[0]}:require("./Round${list[0]}"),`
        let code = `
class Round${list[0]} extends RoundBase.CRoundBase {
    constructor() {
        super();
        this.id = ${list[0]};
        this.index= ${list[1]};
        this.name = '${list[2]}';
        this.key='round' + (Math.floor((this.id - 1) / 5)+1);
        this.star = ${list[3]};
        this.type = ${list[4]};
        this.boss = ${list[5]};
        this.monsterList = ${list[6]};
        this.itemList = ${list[7]};
        this.desc = ${list[8]};
        this.createBoss();
        this.createMonsterList();
        this.createItemList();
    }
}
module.exports = Round${list[0]}
`
        fs.writeFileSync(`../Round/Round${list[0]}.js`, code)
    }
    load += "}";
    fs.writeFileSync(`../Round/load.js`, load)
}).catch(err => {
    console.log(err)
});