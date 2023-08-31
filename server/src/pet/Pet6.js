
class Pet6 extends PetBase.CPetBase {
    constructor(petId, level, pos,rankNum) {
        super(petId, level, pos,rankNum);
        this.id = 6;
        this.petId = petId;
        this.allRace = 634;
        this.name = '超级喷火龙X';
        this.curExp=0;
        this.maxExp = 1000000;
        this.icon = 'penhuolongX';
        this.attr = [9,14];
        this.starLevel = 3;
        this._life = 78;
        this._speed = 100;
        this._atk = 130;
        this._def = 111;
        this._spAtk = 130;
        this._spDef = 85;
        this._level=level?level :1;
        this.pos=pos?pos:0;
        this._quality=5;
        this.skillIdList=[16,17,18];
        this.rankNum=rankNum?rankNum:0;
        this.skillList=[];
        this.createSkillList();
        this.curEnergy=0;
        this.maxEnergy=1000;
    }
    createSkillList() {
        for (let skillId of this.skillIdList) {
            let skill = SKillBase.createSkill(skillId);
            this.skillList.push(skill.packToClient())
        }
    }
}
module.exports = Pet6
