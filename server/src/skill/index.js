class CSKillBase {
    constructor() {
        this.id = 4;
        this.name = "飞砾";
        this.type = 0;
        this.attr = 5;
        this._damage = 96;
        this._level = 1;
        this.atkType = 0;
        this.targetType = 0;
        this._desc = "";
        this.multiple = 0;
    }
    get level() {
        return this._level
    }
    get damage() {
        return Math.floor(this._damage + this._damage * this.level);
    }
    set level(level) {
        this._level = level;
    }
    get desc() {
        let type = this.atkType < 1 ? "物理" : this.atkType < 2 ? "特殊" : "真实";
        return `造成${this.damage}点伤害${type}`;
    }
    packToClient() {
        return {
            id: this.id,
            type: this.type,
            attr: this.attr,
            name: this.name,
            level: this.level,
            damage: this.damage,
            atkType: this.atkType,
            targetType: this.targetType,
            desc: this.desc,
            multiple: this.multiple,
            chillDown: this.chillDown,
            curCd: this.curCd,
        }
    }
}
let allSKill = null;
module.exports = {
    CSKillBase: CSKillBase,
    createSkill(id) {
        allSKill = allSKill || require("./load")
        return new allSKill[id]();
    }
}