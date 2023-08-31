//allPet:当前对战的精灵数组
//enemyList:敌方精灵对象列表
//playerList：我方精灵对象列表
//orderList:速度线对象列表
cc.Class({
    extends: cc.Component,

    properties: {
        skillLayer: cc.Node,
        waveNum: cc.Label,
        roundNum: cc.Label,
        playerLayer: cc.Node,
        panelGameUI: cc.Node,
        enemyLayer: cc.Node,
        orderProgress: cc.Node,
        curPet: 0, //当前精灵节点，0-只是随便给个值
        curIndex: 0, //当前精灵在数组的下标
        maxRound: 20, //最大回合数
        maxWave: 1, //最大波数
        curWave: 1, //当前波数
        curRound: 1, //当前回合数
        totalRound: 0,
        selected: cc.Node,
        endLayer: cc.Node,
        pauseNode: cc.Node,
        skillMask: cc.Node,
        roundTips: cc.Node,
        roundTipsLabel: cc.Label
    },
    // 初始化敌方精灵列表
    initEnemy(info) {
        if (info) {
            this.enemyTeam = info.enemyTeam;
            this.playerTeam = info.playerTeam;
            this.roundId = info.id;
            this.key = info.key;
        }
        this.endLayer.active = false;
        this.pauseNode.active = false;
        this.enemyList = {}
        this.maxWave = this.enemyTeam.length;
        let enemyTeam = this.enemyTeam[this.curWave - 1];
        for (let item of enemyTeam) {
            this.addPet(item, false)
        }
        this.updatePanel();
    },
    // 初始化玩家精灵列表
    initPlayerPet(playerTeam) {
        this.playerList = {};
        let petTeam = playerTeam;
        for (let item of petTeam) {
            this.addPet(item, true);
        }
        this.initAllPet();
    },
    initAllPet() {
        let playerPet = Object.values(this.playerList);
        let enemyPet = Object.values(this.enemyList);
        let newArr = playerPet.concat(enemyPet);
        this.allPet = newArr;
        // all存放pet节点
        this.allPet.sort((a, b) => {
            return b.pet.speed - a.pet.speed;
        })
        this.initOrder();
    },
    // 添加精灵到面板并绑定pet属性，isPlayer：代表是否是玩家精灵
    addPet(item, isPlayer) {
        let pet = cc.instantiate(RES_M.getRes("petPrefab", "petBattle"))
        this.playerLayer.addChild(pet);
        pet.script.init(item, isPlayer);
        pet.pet = item;
        pet.isPlayer = isPlayer;
        if (!isPlayer) {
            pet.type = "enemy"
            this.enemyList[item.pos] = pet;
        } else {
            pet.type = "player"
            this.playerList[item.pos] = pet;
        }
        pet.zIndex = item.pos % 4;
        //添加pet节点到allPet
    },
    // 初始化技能按钮
    initSKillBtn() {
        this.skillLayer.active = true;
        let skillList = this.curPet.pet.skillList;
        for (let index = 0; index < this.skillLayer.children.length; index++) {
            let node = this.skillLayer.children[index];
            node.skill = skillList[index];
            node.getChildByName("skill_selected").active = false;
            node.index = index;
            this.setSKillInfo(node, node.skill);
            if (index >= 2) {
                this.setFinalSkill(node);
            }
            node.on(cc.Node.EventType.TOUCH_END, (e) => {
                this.onClickSkill(node, index);
            })
        }
    },
    // 初始化精灵速度线
    initOrder() {
        this.panelGameUI.active = true;
        this.curIndex = 0;
        this.orderProgress.active = true;
        this.orderProgress.removeAllChildren();
        this.curPet = this.allPet[this.curIndex];
        this.orderList = {};
        let step = 25 * 12 / this.allPet.length;
        for (let index = 0; index < this.allPet.length; index++) {
            let petObj = this.allPet[index].pet;
            let value = this.allPet[index].isPlayer ? "playerOrder" : "enemyOrder";
            let node = cc.instantiate(RES_M.getRes("battlePrefab", value));
            node.getChildByName("icon").getComponent(cc.Sprite).spriteFrame = RES_M.getRes("petIconSpeed", petObj.icon);
            this.orderProgress.addChild(node);
            node.zIndex = -index;
            node.petId = this.allPet[index].pet.petId;
            this.orderList[this.allPet[index].type + petObj.pos] = node;
            if (index != this.curIndex) {
                node.y = -120 - step * (this.allPet.length - index - 1);
            } else {
                node.y = -800;
                node.scale = 2;
            }
            node.zIndex = -node.y;
        }
        if (this.curPet.isPlayer) {
            this.initSKillBtn();
        } else {
            console.log("敌人使用技能")
            this.enemyUseSkill();
        }
    },
    // 初始化技能Cd
    initPetSkillCD() {
        for (let key in this.allPet) {
            if (this.allPet[key].pet && this.allPet[key].pet.skillList) {
                for (let skill of this.allPet[key].pet.skillList) {
                    skill.curCd = 0;
                }
            }
        }
    },
    // 更新速度线
    updateOrder() {
        let perIndex = this.curIndex;
        let nextIndex = (this.curIndex + 1);
        if (nextIndex >= this.allPet.length) {
            this.curRound++;
            if (this.isBossBattle) {
                this.totalRound++;
            }
            this.updateCd();
            this.updatePanel();
        };
        this.curIndex = (nextIndex) % this.allPet.length;
        console.log(this.curIndex, this.allPet[this.curIndex].isDestroyed);
        while (!this.allPet[this.curIndex] || this.allPet[this.curIndex].isDestroyed) {
            this.curIndex = (this.curIndex + 1) % this.allPet.length;
            console.log(this.curIndex);
        }
        console.log(this.curIndex, this.allPet);
        let step = 25 * 12 / this.allPet.length;
        let orderArray = Object.values(this.orderList)
        for (let index = 0; index < orderArray.length; index++) {
            console.log(orderArray[index].petId, this.allPet[perIndex].pet.petId)
            if (orderArray[index].petId != this.allPet[this.curIndex].pet.petId && orderArray[index].petId != this.allPet[perIndex].pet.petId) {
                orderArray[index].runAction(
                    cc.sequence(
                        cc.moveBy(0.1, 0, -step),
                        cc.callFunc(() => {
                            orderArray[index].zIndex = -orderArray[index].y;
                        })
                    )
                )
            } else if (orderArray[index].petId == this.allPet[perIndex].pet.petId) {
                orderArray[index].runAction(
                    cc.sequence(
                        cc.moveTo(0.1, 0, -120),
                        cc.scaleTo(0.1, 1),
                        cc.callFunc(() => {
                            orderArray[index].zIndex = -orderArray[index].y;
                        })
                    )
                )
            } else {
                orderArray[index].runAction(
                    cc.sequence(
                        cc.moveTo(0.1, 0, -800),
                        cc.scaleTo(0.1, 2),
                        cc.callFunc(() => {
                            orderArray[index].zIndex = -orderArray[index].y;
                        })
                    )
                )
            }
        }
        this.curPet = this.allPet[this.curIndex]
        if (this.curPet.isPlayer) {
            this.updateSkill();
        } else {
            this.enemyUseSkill();
        }
    },
    //更新技能cd
    updateCd() {
        for (let key in this.allPet) {
            if (this.allPet[key].pet && this.allPet[key].pet.skillList) {
                for (let skill of this.allPet[key].pet.skillList) {
                    if (skill.curCd > 0) {
                        skill.curCd--;
                    }
                }
            }
        }
    },
    // 更新技能面板
    updateSkill() {
        this.skillLayer.active = true;
        let skillList = this.curPet.pet.skillList;
        for (let index = 0; index < this.skillLayer.children.length; index++) {
            let node = this.skillLayer.children[index];
            node.skill = skillList[index];
            this.setSKillInfo(node, node.skill);
            if (index >= 2) {
                this.setFinalSkill(node);
            }
        }
    },
    // 设置技能信息
    setSKillInfo(node, skill) {
        if (skill.curCd > 0) {
            node.getChildByName("mask").active = true;
            node.getChildByName("mask").getComponentInChildren(cc.Sprite).spriteFrame = RES_M.getRes("CDIcon", "txt_lq_" + skill.curCd);
        } else {
            node.getChildByName("mask").active = false;
        }
        let atkTypeIcon = skill.atkType == 0 ? "icon_w" : skill.atkType == 1 ? "icon_t" : "icon_z";
        node.getChildByName("atkType").getComponent(cc.Sprite).spriteFrame = RES_M.getRes("atkTypeIcon", atkTypeIcon);
        node.getChildByName("attr").getComponent(cc.Sprite).spriteFrame = RES_M.getRes("skillIcon", skill.attr);
        node.getChildByName("name").getComponent(cc.Label).string = skill.name;
    },
    // 设置大招信息
    setFinalSkill(node) {
        let curPower = this.curPet.pet.curEnergy;
        let maxPower = this.curPet.pet.maxEnergy;
        if (curPower < maxPower) {
            node.getChildByName("mask").active = true;
        } else {
            node.getChildByName("mask").active = false;
        }
    },
    // 更新面板
    updatePanel() {
        this.waveNum.string = `第${formateNumLength(this.curWave)}波/${formateNumLength(this.maxWave)}波`;
        this.roundNum.string = `第${formateNumLength(this.curRound)}/${formateNumLength(this.maxRound)}回合`;
    },
    // 点击技能
    onClickSkill(node, index) {
        if (node.skill.curCd > 0) {
            return;
        }
        if (index >= 2 && this.curPet.pet.curEnergy < this.curPet.pet.maxEnergy) {
            return;
        }
        if (this.skillSelected) {
            this.skillSelected.getChildByName("skill_selected").active = false;
            this.skillSelected.runAction(cc.moveBy(0.1, 0, -5));
            if (this.skillSelected.index == node.index) {
                this.selectedShow(node.skill, node.active);
            }
        }
        node.getChildByName("skill_selected").active = true;
        node.runAction(cc.moveBy(0.1, 0, 5));
        this.skillSelected = node;
        this.selectedShow(node.skill, node.active);
    },
    // 根据不同的技能类型选中效果显示
    selectedShow(skill, active) {
        //判断技能类型
        let index = 1;
        if (skill.type == 0 || skill.type == 1) {
            index = (this.enemyList[1] || this.enemyList[2] || this.enemyList[3]) ? 1 : 4
            let end = index + 2;
            this.petSelectedShow(active, index, end);
        } else if (skill.type == 2) {
            index = (this.enemyList[6] || this.enemyList[4] || this.enemyList[5]) ? 4 : 1
            let end = index + 2;
            this.petSelectedShow(active, index, end);
        } else {
            let end = 6;
            this.petSelectedShow(active, index, end);
        }
    },
    // 显示选中效果
    petSelectedShow(active, index, end, max = 6) {
        for (; index <= max; index++) {
            if (this.enemyList[index]) {
                if (!this.enemyList[index].isDestroyed && index <= end) {
                    this.enemyList[index].getChildByName("selected").active = active;
                } else {
                    this.enemyList[index].getChildByName("selected").active = false;
                }
            }
        }
    },
    enemyUseSkill() {
        let enemy = g_Obj.getObj(this.curPet.type + this.curPet.pet.pos);
        if (enemy)
            enemy.enemyUseSkill();
    },
    onSkill(targetPos, skill) {
        skill.curCd = skill.chillDown;
        this.skillSelected.y = 0;
        this.selectedShow(skill, false);
        let enemyNode = this.enemyList[targetPos];
        this.skillLayer.active = false;
        this.skillSelected.getChildByName('skill_selected').active = false;
        this.curPet.script.useSkill(targetPos, skill, enemyNode);
        this.skillSelected = null;
    },
    useFinalSkill() {
        this.skillMask.active = true;
        this.panelGameUI.active = false;
    },
    onclick(e, custom) {
        if (custom == "pause") {
            console.log("暂停");
            this.pauseNode.active = true;
            cc.director.pause();
        } else if (custom == "exit") {
            cc.director.resume();
            cc.director.loadScene("hall", () => {
                cc.find("Canvas").getChildByName("mainUI").getComponent("hall").init();
                cc.find("Canvas").getChildByName("mapUI").active = true;
            });
        } else if (custom == "restart") {
            this.pauseNode.active = false;
            cc.director.resume();
            this.restart();
        } else if (custom == "resume") {
            cc.director.resume();
            this.pauseNode.active = false;
        }
    },
    atkOver() {
        this.skillMask.active = false;
        this.panelGameUI.active = true;
        this.checkDie();
    },
    checkDie() {
        for (let obj of g_Obj.getAllObj()) {
            if (obj.curHp <= 0) {
                obj.petDie();
            }
        }
        this.petDestroy();
    },
    petDestroy() {
        for (let index = 0; index < this.allPet.length; index++) {
            if (this.allPet[index] && this.allPet[index].isDestroyed) {
                let petNode = this.allPet[index];
                this.removeFromPanel(petNode.type, petNode.pet.pos);
            }
        }
        if (Object.values(this.playerList) == 0) {
            console.log("对战失败，游戏结束");
            this.BattleOver(false)
        } else {
            if (Object.values(this.enemyList) == 0) {
                console.log("下一波");
                this.skillLayer.active = false;
                this.orderProgress.active = false;
                this.toNextBattle();
            } else {
                this.updateOrder();
            }
        }

    },
    // 把死亡的宠物从orderLayer，以及enemyList或者playerList中删除
    removeFromPanel(type, pos) {
        let node = this.orderList[type + pos];
        if (node) {
            delete this.orderList[type + pos];
            node.removeFromParent();
        }
        if (type == "enemy") {
            delete this.enemyList[pos];
        } else {
            delete this.playerList[pos];
        }
    },
    toNextBattle() {
        this.curWave++;
        this.toNextWave = true;
        if (this.curWave > this.maxWave) {
            this.toNextWave = false;
            this.BattleOver(true);
            return
        } else
        if (this.curWave == this.maxWave) {
            this.isBossBattle == true;
        }
        this.curRound = 1;
        this.roundTips.active = true;
        this.roundTipsLabel.string = `第${formateNumLength(this.cur)}波/${formateNumLength(this.maxWave)}波`;
    },
    NextWave() {
        if (this.toNextWave) {
            this.roundTips.active = false;
            this.initEnemy();
            this.initPetSkillCD();
            this.scheduleOnce(this.initAllPet);
            this.roundTipsLabel.string = `第${formateNumLength(2)}波/${formateNumLength(this.maxWave)}波`;
            this.toNextWave = false;
        }
    },
    BattleOver(won) {
        this.playWinSpine(won);
        this.C2SBattle(won);
    },
    playWinSpine(won) {
        let endFunc = () => {
            this.winAnim = true;
            this.endLayerShow();
        }
        if (won) {
            for (let key in this.playerList) {
                let node = this.playerList[key];
                node.script.otherSpine(node, "win_loop", true, null, endFunc);
            }
        } else {
            console.log("1231");
            for (let key in this.enemyList) {
                let node = this.enemyList[key];
                node.script.otherSpine(node, "win_loop", true, null, endFunc);
            }
        }
    },
    C2SBattle(won) {
        net.send(this.protocol, 1, { won, serverId: net.serverId, totalRound: this.totalRound, deadNum: this.deadNum, roundId: this.roundId, roundKey: this.key });
    },
    onmessage(sub, data) {
        switch (sub) {
            case 1:
                this.endData = data;
                this.S2CBattleOver();
                break;
        }
    },
    S2CBattleOver() {
        this.S2CGetEnd = true;
        this.endLayerShow();
        Audio_M.stopMusic();
    },
    endLayerShow() {
        console.log(this.S2CGetEnd, this.winAnim)
        if (this.S2CGetEnd && this.winAnim) {
            console.log("执行")
            this.playerLayer.active = false;
            this.panelGameUI.active = false;
            this.S2CGetEnd = true;
            this.endLayer.active = true;
            let { won, curTeam, itemList, fillRound, fillDead, roleInfo, getExp } = this.endData;
            this.endLayer.script && this.endLayer.script.init(won, curTeam, itemList, fillRound, fillDead, roleInfo, getExp);
        }
    },
    restart() {
        let data = { id: this.roundId, key: this.key };
        g_Obj.deleteAllObj();
        this.addLoad(data);
    },
    addLoad(data) {
        let node = cc.instantiate(RES_M.getRes("loadPrefab", "loading"));
        node.getChildByName("bg").getComponent(cc.Sprite).spriteFrame = RES_M.getRes("loadImg", "bg_1");
        this.node.parent.addChild(node);
        node.script && node.script.initGetBattleInfo("battle", "game", data);
    },
    // LIFE-CYCLE CALLBACKS:
    onDestroy() {
        Router.targetOff(this);
    },
    onLoad() {
        Audio_M.playMusic("battle1", true, "battleSound");
        g_Obj.deleteAllObj();
        this.protocol = NET_PROTOCOL.NET_BATTLE;
        this.allPet = [];
        // 触发点击宠物选中监听
        Router.on(BattleEvent.selected, (data) => {
            this.onSkill(data, this.skillSelected.skill);
        }, this);
        Router.on(BattleEvent.AtkOver, (data) => {
            this.atkOver();
        }, this);
        Router.on(BattleEvent.NextWave, (data) => {
            this.NextWave();
        }, this);
        Router.on(this.protocol, (sub, data) => {
            this.onmessage(sub, data);
        }, this)
        Router.on(BattleEvent.FinalSkill, (data) => {
            this.useFinalSkill();
        }, this)
    },

    start() {
        this.initPlayerPet(this.playerTeam);
    },

    // update (dt) {},
});