window.g_AllSkill = window.g_AllSkill || {};

//普攻
window.g_AllSkill[1] = new class skill1 {

    constructor() {
        this.id = 0;
        this.cd = 0;
    }
    onSkill(targetPos, sourceObj, skill) {
        let targetList = null;
        let index, max;
        switch (skill.targetType) {
            case 0:
                index = targetPos;
                max = targetPos;
                break;
            case 1:
                index = Math.floor((targetPos - 1) / 3) + 1;
                max = index * 3;
                break;
            case 2:
                index = 0;
                max = 6;
                break;
        }
        targetList = this.getListObj(sourceObj, index, max);
        for (let obj of targetList) {
            if (obj)
                obj.onHurt(sourceObj, skill);
        }
    }
    getListObj(sourceObj, index, max) {
        let list = [];
        for (; index <= max; index++) {
            let obj = this.getTargetObj(sourceObj, index)
            if (obj) {
                list.push(obj);
            }
        }
        return list
    }
    getTargetObj(node, pos) {
        if (node.isPlayer) {
            return g_Obj.getObj(`enemy` + pos);
        } else {
            return g_Obj.getObj(`player` + pos);
        }
    }
}