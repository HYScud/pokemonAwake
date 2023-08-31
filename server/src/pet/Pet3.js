
class Pet3 extends PetBase.CPetBase {
    constructor(petId, level, pos,rankNum) {
        super(petId, level, pos,rankNum);
        this.id = 3;
        this.petId = petId;
        this.allRace = 680;
        this.name = '超梦';
        this.curExp=0;
        this.maxExp = 1250000;
        this.icon = 'chaomeng';
        this.attr = [13];
        this.starLevel = 4;
        this._life = 106;
        this._speed = 130;
        this._atk = 110;
        this._def = 90;
        this._spAtk = 154;
        this._spDef = 90;
        this._level=level?level :1;
        this.pos=pos?pos:0;
        this._quality=6;
        this.skillIdList=[10,11,12];
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
module.exports = Pet3
