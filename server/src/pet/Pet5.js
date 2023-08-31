
class Pet5 extends PetBase.CPetBase {
    constructor(petId, level, pos,rankNum) {
        super(petId, level, pos,rankNum);
        this.id = 5;
        this.petId = petId;
        this.allRace = 680;
        this.name = '捷克罗姆';
        this.curExp=0;
        this.maxExp = 1250000;
        this.icon = 'jiekeluomu';
        this.attr = [14,12];
        this.starLevel = 4;
        this._life = 100;
        this._speed = 90;
        this._atk = 150;
        this._def = 120;
        this._spAtk = 120;
        this._spDef = 100;
        this._level=level?level :1;
        this.pos=pos?pos:0;
        this._quality=6;
        this.skillIdList=[13,14,15];
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
module.exports = Pet5
