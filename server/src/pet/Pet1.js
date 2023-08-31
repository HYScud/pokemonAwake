
class Pet1 extends PetBase.CPetBase {
    constructor(petId, level, pos,rankNum) {
        super(petId, level, pos,rankNum);
        this.id = 1;
        this.petId = petId;
        this.allRace = 600;
        this.name = '班吉拉斯';
        this.curExp=0;
        this.maxExp = 1250000;
        this.icon = 'banjilasi';
        this.attr = [5,7];
        this.starLevel = 3;
        this._life = 100;
        this._speed = 61;
        this._atk = 134;
        this._def = 110;
        this._spAtk = 95;
        this._spDef = 100;
        this._level=level?level :1;
        this.pos=pos?pos:0;
        this._quality=5;
        this.skillIdList=[4,5,6];
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
module.exports = Pet1
