
class Skill23 extends SKillBase.CSKillBase {
    constructor() {
            super();
            this.id = 23;
            this.name = "电球";
            this.type = 1;
            this.attr = 12;
            this._damage = 144;
            this._level=1;
            this.atkType=1;
            this.targetType=0;
            this.multiple=1.4;
            this.chillDown=2;
            this.curCd=0;
        }
}
module.exports = Skill23
