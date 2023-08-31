
class Skill18 extends SKillBase.CSKillBase {
    constructor() {
            super();
            this.id = 18;
            this.name = "蓝焰喷射";
            this.type = 2;
            this.attr = 9;
            this._damage = 240;
            this._level=1;
            this.atkType=0;
            this.targetType=0;
            this.multiple=4.8;
            this.chillDown=0;
            this.curCd=0;
        }
}
module.exports = Skill18
