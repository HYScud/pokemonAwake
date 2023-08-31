
class Skill19 extends SKillBase.CSKillBase {
    constructor() {
            super();
            this.id = 19;
            this.name = "毒刺";
            this.type = 0;
            this.attr = 3;
            this._damage = 96;
            this._level=1;
            this.atkType=0;
            this.targetType=0;
            this.multiple=0.8;
            this.chillDown=0;
            this.curCd=0;
        }
}
module.exports = Skill19
