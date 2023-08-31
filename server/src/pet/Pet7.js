
class Pet7 extends PetBase.CPetBase {
    constructor(petId, level, pos,rankNum) {
        super(petId, level, pos,rankNum);
        this.id = 7;
        this.petId = petId;
        this.allRace = 275;
        this.name = '尼多兰';
        this.curExp=0;
        this.maxExp = 800000;
        this.icon = 'niduolan';
        this.attr = [3];
        this.starLevel = 2;
        this._life = 55;
        this._speed = 41;
        this._atk = 47;
        this._def = 52;
        this._spAtk = 40;
        this._spDef = 40;
        this._level=level?level :1;
        this.pos=pos?pos:0;
        this._quality=3;
        this.skillIdList=[19,20,21];
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
module.exports = Pet7
