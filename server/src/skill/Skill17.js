
class Skill17 extends SKillBase.CSKillBase {
    constructor() {
            super();
            this.id = 17;
            this.name = "蓝色火焰";
            this.type = 1;
            this.attr = 14;
            this._damage = 96;
            this._level=1;
            this.atkType=0;
            this.targetType=0;
            this.multiple=1.6;
            this.chillDown=2;
            this.curCd=0;
        }
}
module.exports = Skill17
