// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        petNode: cc.Node,
        infoNode: cc.Node,
        spineData: sp.Skeleton,
        levelLabel: cc.Label,
        hpProgress: cc.ProgressBar,
        energyProgress: cc.ProgressBar,
        curHp: 100,
        maxHp: 100,
        curEnergy: 300,
        maxEnergy: 1000
    },

    onClick(e, custom) {
        if (custom == "selected") {
            Router.emit(BattleEvent.selected, this.node.pet.pos);
        }
    },

    init(item, isPlayer) {
        this.pos = item.pos;
        this.pet = item;
        this.type = isPlayer ? "player" : "enemy";
        this.spineData.skeletonData = RES_M.getRes("petSpine", item.icon);
        this.spineData.defaultAnimation = "standby_loop";
        this.spineData.setAnimation(0, "standby_loop", true);
        this.node.x = petPos[isPlayer ? "player" : "enemy"][item.pos - 1][0];
        this.node.y = petPos[isPlayer ? "player" : "enemy"][item.pos - 1][1];
        this.levelLabel.string = item.level;
        this.curHp = this.maxHp = item.life;
        this.hpProgress.progress = this.curHp / this.maxHp;
        this.curEnergy = item.curEnergy;
        this.maxEnergy = item.maxEnergy;
        this.energyProgress.progress = this.curEnergy / this.maxEnergy;
        if (!isPlayer) {
            this.petNode.scaleX = -1;
        }
    },
    enemyUseSkill() {
        let skill;
        if (this.curEnergy == this.maxEnergy) {
            skill = this.pet.skillList[2];
        } else if (this.pet.skillList[2].curCd <= 0) {
            skill = this.pet.skillList[1];
        } else {
            skill = this.pet.skillList[0];
        }
        let targetObj = this.findTarget();
        if (targetObj)
            this.useSkill(targetObj.pos, skill, targetObj.node);
    },
    findTarget() {
        let index = 1;
        for (; index <= 6; index++) {
            let obj = g_Obj.getObj("player" + index)
            if (obj)
                return obj;
        }
    },
    useSkill(targetPos, skill, enemyNode) {
        this.node.zIndex = 1000;
        this.infoNode.active = false;
        switch (skill.type) {
            case 0:
                this.useAttack(targetPos, skill, enemyNode);
                break;
            case 1:
                this.useSkill1(targetPos, skill, enemyNode);
                break;
            case 2:
                this.useSkill12(targetPos, skill);
                break;
        }
    },
    useAttack(targetPos, skill, enemyNode) {
        let offset = this.type == "player" ? -300 : 300;
        this.node.runAction(cc.sequence(
            cc.spawn(
                cc.moveTo(0.5 * Math.abs(this.node.x - enemyNode.x - offset) / 300, enemyNode.x + offset, enemyNode.y),
                cc.callFunc(() => {
                    this.otherSpine(this.node, "run_loop", false);
                })
            ),
            cc.callFunc(() => {
                Audio_M.play(this.pet.icon + "_attack", false, "petSound");
                this.skillSpine(this.node, "attack", false, targetPos, this.pos, skill);
            })
        ))
    },
    useSkill1(targetPos, skill, enemyNode) {
        let offset = this.type == "player" ? -300 : 300;
        this.node.runAction(cc.sequence(
            cc.spawn(
                cc.moveTo(0.5 * Math.abs(this.node.x - enemyNode.x - offset) / 300, enemyNode.x + offset, enemyNode.y),
                cc.callFunc(() => {
                    this.otherSpine(this.node, "run_loop", false);
                })
            ),
            cc.callFunc(() => {
                Audio_M.play(this.pet.icon + "_skill1", false, "petSound");
                this.skillSpine(this.node, "skill1", false, targetPos, this.pos, skill);
            })
        ))
    },
    useSkill12(targetPos, skill) {
        this.curEnergy = 0;
        this.node.pet.curEnergy = 0;
        this.updatePetPanel();
        this.node.runAction(cc.sequence(
            cc.spawn(
                cc.moveTo(0.5 * Math.abs(this.node.x) / 300, 0, 0),
                cc.callFunc(() => {
                    this.otherSpine(this.node, "run_loop", false);
                })
            ),
            cc.callFunc(() => {
                Router.emit(BattleEvent.FinalSkill);
                Audio_M.play(this.pet.icon + "_skill2", false, "petSound");
                this.skillSpine(this.node, "skill2", false, targetPos, this.pos, skill);
            })
        ))
    },
    addEnergy(num) {
        this.curEnergy += num;
        this.node.pet.curEnergy += num;
        if (this.curEnergy > this.maxEnergy) {
            this.node.pet.curEnergy = this.curEnergy = this.maxEnergy;
        }
        this.updatePetPanel();
    },
    // 宠物释放技能
    skillSpine(node, anim, loop, targetPos, sourcePos, skill) {
        let endFunc = () => {
            this.addEnergy(300);
            this.petReStart(node, sourcePos);
        }
        let func = () => {
            g_Skill.onSkill(targetPos, skill, node);
        }
        Spine_M.playSpine(node, anim, loop, func, endFunc);
    },
    // 宠物移动、站立动画
    otherSpine(node, anim, loop, func, endFunc, interruptFunc) {
        Spine_M.playSpine(node, anim, loop, func, endFunc, interruptFunc);
    },
    // 宠物释放技能回到原位置
    petReStart(node, sourcePos) {
        node.getChildByName("petBattle").scaleX = -node.getChildByName("petBattle").scaleX;
        node.runAction(cc.sequence(
            cc.spawn(
                cc.moveTo(0.5, petPos[node.type][sourcePos - 1][0], petPos[node.type][sourcePos - 1][1]),
                cc.callFunc(() => {
                    this.otherSpine(node, "run_loop", false, null, null, null);
                })
            ),
            cc.callFunc(() => {
                this.infoNode.active = true;
                Router.emit(BattleEvent.AtkOver);
                node.getChildByName("petBattle").scaleX = -node.getChildByName("petBattle").scaleX;
                this.node.zIndex = (this.node.pet.pos - 1) % 3 + 1;
                this.otherSpine(node, "standby_loop", true);
            })))
    },
    updatePetPanel() {
        this.hpProgress.progress = this.curHp / this.maxHp;
        this.energyProgress.progress = this.curEnergy / this.maxEnergy;
    },
    // 受伤
    onHurt(sourceObj, skill) {
        this.node.zIndex = 1000;
        if (!cc.isValid(this.node)) return;
        let hurt = this.getHurtNum(sourceObj, skill);
        //let hurt = 10;
        this.curHp -= hurt;
        this.curHp = this.curHp < 0 ? 0 : this.curHp;
        this.addEnergy((hurt / this.maxHp).toFixed(2) * 1000 * 1.25);
        this.updatePetPanel();
        this.damageNumShow(hurt);
        if (this.curHp <= 0)
            this.node.isDestroyed = true;
        let endFunc = () => {
            this.node.zIndex = this.pos;
            Spine_M.playSpine(this.node, "standby_loop", true);
        }
        Spine_M.playSpine(this.node, "hit", false, null, endFunc);
    },
    // 伤害显示
    damageNumShow(hurt) {
        let node = cc.instantiate(RES_M.getRes("battlePrefab", "hurtLabel"));
        node.getComponent(cc.Label).string = -hurt
        this.node.addChild(node);
        node.runAction(cc.sequence(
            cc.spawn(
                cc.sequence(
                    cc.scaleTo(1, 1.2),
                    cc.scaleTo(1, 1),
                ),
                cc.moveBy(2, 0, 100),
                cc.fadeOut(1),
            ),
            cc.callFunc(() => {
                node.destroy();
            })
        ))
    },
    getHurtNum(sourceObj, skill) {
        let atkNum, defNum;
        let damage;
        switch (skill.atkType) {
            case 0:
                atkNum = sourceObj.pet.atk;
                defNum = this.pet.def;
                damage = atkNum * skill.multiple + skill.damage - defNum;
                break;
            case 1:
                atkNum = sourceObj.pet.spAtk;
                defNum = this.pet.spDef;
                damage = atkNum * skill.multiple + skill.damage - defNum;
                break;
            case 2:
                damage = skill.damage;
                break;
        }
        return Math.max(Math.floor(damage / 2), 1);
    },
    // LIFE-CYCLE CALLBACKS:
    petDie() {
        console.log("删除");
        g_Obj.deleteObj(this.type + this.node.pet.pos);
        let sk = this.node.getComponentInChildren(sp.Skeleton);
        sk.skeletonData = RES_M.getRes('battleSpine', "death");
        let endFunc = () => {
            Router.emit(BattleEvent.NextWave);
            this.node.destroy();
        }
        Spine_M.playSpine(this.node, "effect", false, null, endFunc);
    },
    onLoad() {
        this.node.script = this;
    },
    start() {
        console.log("添加")
        g_Obj.addObj(this.type + this.node.pet.pos, this);
    },

    // update (dt) {},
});