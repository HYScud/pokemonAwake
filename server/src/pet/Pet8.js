
class Pet8 extends PetBase.CPetBase {
    constructor(petId, level, pos,rankNum) {
        super(petId, level, pos,rankNum);
        this.id = 8;
        this.petId = petId;
        this.allRace = 320;
        this.name = '皮卡丘';
        this.curExp=0;
        this.maxExp = 800000;
        this.icon = 'pikaqui';
        this.attr = [12];
        this.starLevel = 2;
        this._life = 35;
        this._speed = 90;
        this._atk = 55;
        this._def = 40;
        this._spAtk = 50;
        this._spDef = 50;
        this._level=level?level :1;
        this.pos=pos?pos:0;
        this._quality=4;
        this.skillIdList=[22,23,24];
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
module.exports = Pet8
