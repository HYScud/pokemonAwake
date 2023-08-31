
class Skill14 extends SKillBase.CSKillBase {
    constructor() {
            super();
            this.id = 14;
            this.name = "雷击";
            this.type = 1;
            this.attr = 12;
            this._damage = 240;
            this._level=1;
            this.atkType=0;
            this.targetType=0;
            this.multiple=1.8;
            this.chillDown=2;
            this.curCd=0;
        }
}
module.exports = Skill14
