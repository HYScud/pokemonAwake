
class Skill3 extends SKillBase.CSKillBase {
    constructor() {
            super();
            this.id = 3;
            this.name = "画龙点睛";
            this.type = 2;
            this.attr = 14;
            this._damage = 320;
            this._level=1;
            this.atkType=1;
            this.targetType=2;
            this.multiple=3.6;
            this.chillDown=0;
            this.curCd=0;
        }
}
module.exports = Skill3
