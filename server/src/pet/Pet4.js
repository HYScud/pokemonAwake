
class Pet4 extends PetBase.CPetBase {
    constructor(petId, level, pos,rankNum) {
        super(petId, level, pos,rankNum);
        this.id = 4;
        this.petId = petId;
        this.allRace = 251;
        this.name = '波波';
        this.curExp=0;
        this.maxExp = 800000;
        this.icon = 'bobo';
        this.attr = [0,2];
        this.starLevel = 2;
        this._life = 40;
        this._speed = 56;
        this._atk = 45;
        this._def = 40;
        this._spAtk = 35;
        this._spDef = 35;
        this._level=level?level :1;
        this.pos=pos?pos:0;
        this._quality=4;
        this.skillIdList=[7,8,9];
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
module.exports = Pet4
