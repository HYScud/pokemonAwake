
class Pet9 extends PetBase.CPetBase {
    constructor(petId, level, pos,rankNum) {
        super(petId, level, pos,rankNum);
        this.id = 9;
        this.petId = petId;
        this.allRace = 305;
        this.name = '腕力';
        this.curExp=0;
        this.maxExp = 800000;
        this.icon = 'wanli';
        this.attr = [1];
        this.starLevel = 2;
        this._life = 70;
        this._speed = 35;
        this._atk = 80;
        this._def = 50;
        this._spAtk = 35;
        this._spDef = 35;
        this._level=level?level :1;
        this.pos=pos?pos:0;
        this._quality=4;
        this.skillIdList=[25,26,27];
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
module.exports = Pet9
