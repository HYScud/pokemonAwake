window.g_AllSkill = window.g_AllSkill || {};

//普攻
window.g_AllSkill[0] = new class attack {

    constructor() {
        this.id = 0;
    }
    onSkill(targetPos, sourceObj, skill) {
        let target = null;
        if (sourceObj.isPlayer) {
            target = g_Obj.getObj(`enemy` + targetPos);
        } else {
            target = g_Obj.getObj(`player` + targetPos);
        }
        if (target) {
            target.onHurt(sourceObj, skill);
        }
    }
}