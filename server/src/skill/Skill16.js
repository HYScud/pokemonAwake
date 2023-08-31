
class Skill16 extends SKillBase.CSKillBase {
    constructor() {
            super();
            this.id = 16;
            this.name = "火焰拳";
            this.type = 0;
            this.attr = 9;
            this._damage = 96;
            this._level=1;
            this.atkType=0;
            this.targetType=0;
            this.multiple=1;
            this.chillDown=0;
            this.curCd=0;
        }
}
module.exports = Skill16
