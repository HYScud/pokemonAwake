
class Skill21 extends SKillBase.CSKillBase {
    constructor() {
            super();
            this.id = 21;
            this.name = "剧毒针雨";
            this.type = 2;
            this.attr = 3;
            this._damage = 96;
            this._level=1;
            this.atkType=0;
            this.targetType=2;
            this.multiple=1.1;
            this.chillDown=0;
            this.curCd=0;
        }
}
module.exports = Skill21
