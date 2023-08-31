
class Skill27 extends SKillBase.CSKillBase {
    constructor() {
            super();
            this.id = 27;
            this.name = "十字切";
            this.type = 2;
            this.attr = 1;
            this._damage = 240;
            this._level=1;
            this.atkType=0;
            this.targetType=0;
            this.multiple=7.8;
            this.chillDown=0;
            this.curCd=0;
        }
}
module.exports = Skill27
