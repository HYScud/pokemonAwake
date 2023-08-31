
class Skill15 extends SKillBase.CSKillBase {
    constructor() {
            super();
            this.id = 15;
            this.name = "交错闪电";
            this.type = 2;
            this.attr = 12;
            this._damage = 360;
            this._level=1;
            this.atkType=0;
            this.targetType=0;
            this.multiple=3.6;
            this.chillDown=0;
            this.curCd=0;
        }
}
module.exports = Skill15
