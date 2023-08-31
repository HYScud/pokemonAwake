
class Skill24 extends SKillBase.CSKillBase {
    constructor() {
            super();
            this.id = 24;
            this.name = "高压电击";
            this.type = 2;
            this.attr = 12;
            this._damage = 144;
            this._level=1;
            this.atkType=1;
            this.targetType=1;
            this.multiple=2.4;
            this.chillDown=0;
            this.curCd=0;
        }
}
module.exports = Skill24
