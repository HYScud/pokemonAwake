
class Skill25 extends SKillBase.CSKillBase {
    constructor() {
            super();
            this.id = 25;
            this.name = "空手刀";
            this.type = 0;
            this.attr = 1;
            this._damage = 96;
            this._level=1;
            this.atkType=0;
            this.targetType=0;
            this.multiple=0.8;
            this.chillDown=0;
            this.curCd=0;
        }
}
module.exports = Skill25
