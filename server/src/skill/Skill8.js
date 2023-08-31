
class Skill8 extends SKillBase.CSKillBase {
    constructor() {
            super();
            this.id = 8;
            this.name = "扬尘";
            this.type = 1;
            this.attr = 2;
            this._damage = 144;
            this._level=1;
            this.atkType=0;
            this.targetType=0;
            this.multiple=1.3;
            this.chillDown=2;
            this.curCd=0;
        }
}
module.exports = Skill8
