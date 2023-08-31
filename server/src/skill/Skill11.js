
class Skill11 extends SKillBase.CSKillBase {
    constructor() {
            super();
            this.id = 11;
            this.name = "超能拳击";
            this.type = 1;
            this.attr = 13;
            this._damage = 96;
            this._level=1;
            this.atkType=1;
            this.targetType=1;
            this.multiple=1.6;
            this.chillDown=2;
            this.curCd=0;
        }
}
module.exports = Skill11
