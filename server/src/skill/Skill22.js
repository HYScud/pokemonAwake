
class Skill22 extends SKillBase.CSKillBase {
    constructor() {
            super();
            this.id = 22;
            this.name = "十万伏特";
            this.type = 0;
            this.attr = 12;
            this._damage = 96;
            this._level=1;
            this.atkType=1;
            this.targetType=0;
            this.multiple=0.9;
            this.chillDown=0;
            this.curCd=0;
        }
}
module.exports = Skill22
