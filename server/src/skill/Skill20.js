
class Skill20 extends SKillBase.CSKillBase {
    constructor() {
            super();
            this.id = 20;
            this.name = "咬住";
            this.type = 1;
            this.attr = 3;
            this._damage = 120;
            this._level=1;
            this.atkType=0;
            this.targetType=0;
            this.multiple=1.2;
            this.chillDown=2;
            this.curCd=0;
        }
}
module.exports = Skill20
