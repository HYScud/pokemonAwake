class CPetBase {
    constructor(petId, level, pos) {
        this.id = 1;
        this.petId = petId;
        this.allRace = 600;
        this.name = '班吉拉斯';
        this.curExp = 0;
        this.maxExp = 1250000;
        this.icon = 'banjilasi';
        this.attr = [5, 7];
        this.starLevel = 5;
        this._life = 2560;
        this._speed = 98;
        this._atk = 2200;
        this._def = 1789;
        this._spAtk = 1600;
        this._spDef = 1500;
        this._level = level ? level : 1;
        this.pos = pos ? pos : 0;
        this._quality = 4;
        this.skillIdList = [];
        this.rankNum = 0;
        this.skillList = [];
        this.maxEnergy = 1000;
        this.curEnergy = 0;
        this.expRatio = 0;
    }
    get life() {
        return Math.floor(this._life * 2 + 2000 + (1500 * this.rankNum / 4) + this._life * (this.level / 20 + this.rankNum + this._level + this.starLevel))
    }
    get speed() {
        return Math.floor(this._speed + this._level * this._speed / 10 + this.rankNum * 10);
    }
    get level() {
        return this._level
    }
    get atk() {
        return Math.floor(this._atk * 2 + 300 + this._atk * 0.4 * (this.level + this.rankNum * 5)) + this._quality * 50
    }
    get def() {
        return Math.floor(this._def * 2 + 300 + this._def * 0.4 * (this.level + this.rankNum * 5)) + this._quality * 50
    }
    get spAtk() {
        return Math.floor(this._spAtk * 2 + 300 + this._spAtk * 0.4 * (this.level + this.rankNum * 5)) + this._quality * 50
    }
    get spDef() {
        return Math.floor(this._spDef * 2 + 300 + this._spDef * 0.4 * (this.level + this.rankNum * 5)) + this._quality * 50
    }
    get power() {
        return Math.floor((this.spDef * 2 + 300 + this.def) * 0.1 / 3 + (this.atk + this.spAtk) * 0.2 + this.starLevel * 150 + this._quality * 20);
    }
    set level(level) {
        this._level = level;
    }
    get curLevelExp() {
        return Math.pow(this.level, 3) - Math.pow(this.level - 1, 3)
    }
    addExp(effectNum) {
        this.curExp += effectNum;
        while (this.curExp > this.curLevelExp) {
            this.curExp = this.curExp - this.curLevelExp;
            this.level++;
            log("获得" + effectNum + "经验");
        }
    }
    packToClient() {
        return {
            petId: this.petId,
            id: this.id,
            allRace: this.allRace,
            name: this.name,
            curExp: this.curExp,
            curLevelExp: this.curLevelExp,
            maxExP: this.maxExp,
            icon: this.icon,
            attr: this.attr,
            starLevel: this.starLevel,
            life: this.life,
            speed: this.speed,
            atk: this.atk,
            def: this.def,
            spAtk: this.spAtk,
            spDef: this.spDef,
            level: this.level,
            power: this.power,
            pos: this.pos,
            quality: this._quality,
            rankNum: this.rankNum,
            skillList: this.skillList,
            maxEnergy: this.maxEnergy,
            curEnergy: this.curEnergy,
        }
    }
}
let allPet = null;
module.exports = {
    CPetBase: CPetBase,
    createPet(id, petId) {
        allPet = allPet || require("./load")
        return new allPet[id](petId);
    },
    createPet(id, petId, level, pos, rankNum) {
        allPet = allPet || require("./load")
        return new allPet[id](petId, level, pos, rankNum);
    }
}