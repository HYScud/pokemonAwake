let ejsexcel = require('ejsexcel')
let fs = require('fs')
let excelBuff = fs.readFileSync("../../技能表.xlsx");
console.log(excelBuff)
ejsexcel.getExcelArr(excelBuff).then(excelJson => {
    console.log(excelJson)
    let itemArr = excelJson[0];
    let load = `module.exports = {`;
    for (let index = 1; index < itemArr.length; index++) {
        let list = itemArr[index];
        load += `${list[0]}:require("./Skill${list[0]}"),`
        let code = `
class Skill${list[0]} extends SKillBase.CSKillBase {
    constructor() {
            super();
            this.id = ${list[0]};
            this.name = "${list[1]}";
            this.type = ${list[2]};
            this.attr = ${list[3]};
            this._damage = ${list[4]};
            this._level=${list[5]};
            this.atkType=${list[6]};
            this.targetType=${list[7]};
            this.multiple=${list[8]};
            this.chillDown=${list[9]};
            this.curCd=${list[10]};
        }
}
module.exports = Skill${list[0]}
`
        fs.writeFileSync(`../skill/Skill${list[0]}.js`, code)
    }
    load += "}";
    fs.writeFileSync(`../skill/load.js`, load)
}).catch(err => {
    console.log(err)
});