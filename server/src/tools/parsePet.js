let ejsExcel = require('ejsexcel')
let fs = require('fs')
let excelBuff = fs.readFileSync("../../宠物表.xlsx");
console.log(excelBuff)
ejsExcel.getExcelArr(excelBuff).then(excelJson => {
    let itemArr = excelJson[0];
    let load = `module.exports = {`;
    for (let index = 1; index < itemArr.length; index++) {
        let list = itemArr[index];
        load += `${list[0]}:require("./Pet${list[0]}"),`
        let code = `
class Pet${list[0]} extends PetBase.CPetBase {
    constructor(petId, level, pos,rankNum) {
        super(petId, level, pos,rankNum);
        this.id = ${list[0]};
        this.petId = petId;
        this.allRace = ${list[1]};
        this.name = '${list[2]}';
        this.curExp=0;
        this.maxExp = ${list[3]};
        this.icon = '${list[4]}';
        this.attr = ${list[5]};
        this.starLevel = ${list[6]};
        this._life = ${list[7]};
        this._speed = ${list[8]};
        this._atk = ${list[9]};
        this._def = ${list[10]};
        this._spAtk = ${list[11]};
        this._spDef = ${list[12]};
        this._level=level?level :${list[13]};
        this.pos=pos?pos:${list[14]};
        this._quality=${list[15]};
        this.skillIdList=${list[16]};
        this.rankNum=rankNum?rankNum:${list[17]};
        this.skillList=[];
        this.createSkillList();
        this.curEnergy=${list[18]};
        this.maxEnergy=${list[19]};
    }
    createSkillList() {
        for (let skillId of this.skillIdList) {
            let skill = SKillBase.createSkill(skillId);
            this.skillList.push(skill.packToClient())
        }
    }
}
module.exports = Pet${list[0]}
`
        fs.writeFileSync(`../pet/Pet${list[0]}.js`, code)
    }
    load += "}";
    fs.writeFileSync(`../pet/load.js`, load)
}).catch(err => {
    console.log(err)
});