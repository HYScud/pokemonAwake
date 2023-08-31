
class Skill2 extends SKillBase.CSKillBase {
    constructor() {
            super();
            this.id = 2;
            this.name = "龙卷风";
            this.type = 1;
            this.attr = 14;
            this._damage = 192;
            this._level=1;
            this.atkType=1;
            this.targetType=0;
            this.multiple=1.6;
            this.chillDown=2;
            this.curCd=0;
        }
}
module.exports = Skill2
