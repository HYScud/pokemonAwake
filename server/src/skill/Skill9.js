
class Skill9 extends SKillBase.CSKillBase {
    constructor() {
            super();
            this.id = 9;
            this.name = "沙尘突袭";
            this.type = 2;
            this.attr = 2;
            this._damage = 240;
            this._level=1;
            this.atkType=0;
            this.targetType=0;
            this.multiple=4.7;
            this.chillDown=0;
            this.curCd=0;
        }
}
module.exports = Skill9
