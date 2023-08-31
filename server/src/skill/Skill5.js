
class Skill5 extends SKillBase.CSKillBase {
    constructor() {
            super();
            this.id = 5;
            this.name = "恶灵撕咬";
            this.type = 1;
            this.attr = 16;
            this._damage = 192;
            this._level=1;
            this.atkType=0;
            this.targetType=0;
            this.multiple=1.6;
            this.chillDown=2;
            this.curCd=0;
        }
}
module.exports = Skill5
