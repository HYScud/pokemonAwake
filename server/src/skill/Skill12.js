
class Skill12 extends SKillBase.CSKillBase {
    constructor() {
            super();
            this.id = 12;
            this.name = "奇迹之眼";
            this.type = 2;
            this.attr = 13;
            this._damage = 360;
            this._level=1;
            this.atkType=1;
            this.targetType=1;
            this.multiple=5.6;
            this.chillDown=0;
            this.curCd=0;
        }
}
module.exports = Skill12
