
class Skill1 extends SKillBase.CSKillBase {
    constructor() {
            super();
            this.id = 1;
            this.name = "破坏光线";
            this.type = 0;
            this.attr = 14;
            this._damage = 96;
            this._level=1;
            this.atkType=1;
            this.targetType=0;
            this.multiple=1;
            this.chillDown=0;
            this.curCd=0;
        }
}
module.exports = Skill1
