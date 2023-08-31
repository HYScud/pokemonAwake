
class Skill6 extends SKillBase.CSKillBase {
    constructor() {
            super();
            this.id = 6;
            this.name = "轰岩大炮";
            this.type = 2;
            this.attr = 5;
            this._damage = 300;
            this._level=1;
            this.atkType=0;
            this.targetType=0;
            this.multiple=4;
            this.chillDown=0;
            this.curCd=0;
        }
}
module.exports = Skill6
