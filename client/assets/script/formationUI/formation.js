// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        formationLayer: cc.Node,
        content: cc.Node,
        powerLabel: cc.Label,
        filterLayer: cc.Node,
        filterLabel: cc.Label,
        formationLabel: cc.Label,
        scrollView: cc.ScrollView,
        moveLayer: cc.Node,
        collisionId: 0,
    },
    onClick(e, custom) {
        Audio_M.play("click_1", false, "sound");
        if (custom == "close") {
            this.node.active = false;
        } else if (custom == "sortShow") {
            this.filterLayer.active = !this.filterLayer.active;
        }
    },
    onClickFilter(node) {
        Audio_M.play("click_1", false, "sound");
        if (node == this.selected) {
            return
        }
        this.selected.getChildByName("selected").active = false;
        this.selected.getChildByName("name").color = new cc.Color(255, 59, 59, 255);
        this.selected = node;
        this.selected.getChildByName("selected").active = true;
        this.selected.getChildByName("name").color = new cc.Color(255, 255, 255, 255);
        this.filterLayer.active = false;
        this.sortItem(node.index);
    },
    sortItem(index) {
        switch (index) {
            case 0:
                sortByPower(this.content.children);
                break;
            case 1:
                sortByLevel(this.content.children);
                break;
            case 2:
                sortByStarLevel(this.content.children);
                break;
            case 3:
                sortByName(this.content.children);
                break;
        }
    },
    init() {
        let petTeam = curPlayer.getData().curTeam;
        this.curTeam = petTeam;
        this.formationLabel.string = `上阵精灵：${petTeam.length}/6`;
        petTeam.forEach(element => {
            let node = this.formationLayer.getChildByName(`pet${element.pos}`);
            //node.removeAllChildren();
            let pet = cc.instantiate(RES_M.getRes("petPrefab", "pet"));
            pet.petId = element.petId;
            pet.pet = element;
            let sk = pet.getComponent(sp.Skeleton);
            sk.skeletonData = RES_M.getRes("petSpine", element.icon);
            sk.defaultAnimation = "standby_loop";
            sk.setAnimation(0, "standby_loop", true);
            node.addChild(pet);
        });
        this.powerLabel.string = curPlayer.getData().power;
        this.initScroll(petTeam);
        this.initFilter();
    },
    initFilter() {
        for (let index = 0; index < this.filterLayer.children.length; index++) {
            let node = this.filterLayer.children[index];
            node.index = index;
            node.on(cc.Node.EventType.TOUCH_END, () => {
                this.onClickFilter(node)
            })
            if (!this.selected) {
                this.selected = node;
                node.getChildByName("selected").active = true;
            }
        }
    },
    initScroll(curTeam) {
        let allPet = curPlayer.getData().petBag;
        allPet = Object.values(allPet);
        allPet.sort((a, b) => {
            return b.power - a.power;
        });
        if (allPet.length > 12) {
            this.batchIndex = 0;
            this.batchNum = 12;
            this.batchAdd(curTeam, allPet);
        } else {
            this.addAllPetBox(curTeam, allPet);
        }
    },
    addAllPetBox(curTeam, allPet) {
        for (let index = 0; index < allPet.length; index++) {
            let petInfo = allPet[index];
            this.addPetBox(curTeam, petInfo, index);
        }
    },
    batchAdd(curTeam, allPet) {
        if (this.batchIndex >= allPet.length) {
            return;
        }
        for (let index = this.batchIndex; index < Math.min(this.batchIndex + this.batchNum, allPet.length); index++) {
            let petInfo = allPet[index];
            this.addPetBox(curTeam, petInfo, index);
        }
        this.batchIndex += this.batchNum;
        setTimeout(() => {
            this.batchAdd(curTeam, allPet);
        }, 100);
    },

    addPetBox(curTeam, petInfo, index) {
        let petNode = cc.instantiate(RES_M.getRes("petPrefab", "petBox"));
        initStar(petNode.getChildByName("starLayer"), petInfo.starLevel);
        petNode.petId = petInfo.petId;
        petNode.pet = petInfo;
        this.content.addChild(petNode);
        if (!isContains(curTeam, petInfo.petId)) {
            petNode.getChildByName("selected").active = false;
            petNode.getChildByName("mask").active = false;
        } else {
            petNode.getChildByName("selected").active = true;
            petNode.getChildByName("mask").active = true;
        }
        petNode.script.init(petInfo);
        this.addListen(index, petNode);
    },
    addListen(index, petNode) {
        let moveToTeam = false;
        let scrollMove = true;
        let hasMoveTo = false;
        let petOrScroll = false;
        petNode.on(cc.Node.EventType.TOUCH_START, (e) => {
            this.startX = e.getLocation().x;
            this.startY = e.getLocation().y;
            this.moveBox = petNode;
        });
        petNode.on(cc.Node.EventType.TOUCH_MOVE, (e) => {
            let x = e.getLocation().x;
            let y = e.getLocation().y;
            if (!moveToTeam && Math.abs(x - this.startX) > 10) {
                console.log("滚动视图");
                petOrScroll = true;
                scrollMove = true;
            }
            if (Math.abs(y - this.startY) > 20 && !petOrScroll) {
                this.disableScroll();
                if (!hasMoveTo) {
                    console.log("创建宠物");
                    moveToTeam = true;
                    scrollMove = false;
                    this.CreateMovePet(e, index, petNode.pet);
                    hasMoveTo = true;
                } else {
                    this.movePetToTeam(e);
                }

            }
        });
        petNode.on(cc.Node.EventType.TOUCH_CANCEL, (e) => {
            if (hasMoveTo) {
                this.checkFormation();
            }
            moveToTeam = false;
            scrollMove = true;
            hasMoveTo = false;
            petOrScroll = false;
            this.scrollAllResume();
        });
        petNode.on(cc.Node.EventType.TOUCH_END, (e) => {
            if (!moveToTeam && !petOrScroll) {
                this.petNodeClick(e, petNode.pet, index);
            }
            moveToTeam = false;
            if (this.movePet)
                this.movePet.removeFromParent();
            scrollMove = true;
            hasMoveTo = false;
            petOrScroll = false;
            this.scrollAllResume();
        });
    },
    CreateMovePet(e, index, petInfo) {
        let petFormation = cc.instantiate(RES_M.getRes("petPrefab", "petFormation"));
        petFormation.id = petInfo.petId;
        petFormation.index = index;
        this.movePet = petFormation;
        this.moveLayer.addChild(petFormation);
        petFormation.script.init(petInfo);
    },
    movePetToTeam(e) {
        let pos = this.moveLayer.convertToNodeSpaceAR(e.getLocation());
        this.movePet.setPosition(pos);
    },
    disableScroll() {
        this.scrollView.horizontal = false;
    },
    scrollAllResume() {
        this.movePet = null;
        this.scrollView.horizontal = true;
    },
    petNodeClick(e, pet) {
        if (isContains(this.curTeam, pet.petId)) {
            if (this.curTeam.length > 1) {
                this.C2SRemoveFromTeam(pet);
            } else {
                console.log("只剩最后一只啦");
            }
        } else {
            if (this.curTeam.length >= 6) {
                console.log("上阵已满");
                return
            } else {
                this.moveBox.getChildByName("selected").active = true;
                this.moveBox.getChildByName("mask").active = true;
                this.C2SAutoAddToTeam(pet.petId);
            }
        }
    },
    checkFormation() {
        if (this.movePos == 0) {

        } else {
            if (isContains(this.curTeam, this.moveBox.pet.petId)) {
                //如果拿的是队伍中的
                if (this.moveBox.pet.pos != this.movePos) {
                    // 如果放的位置和原本位置不一样。
                    let Layer = this.formationLayer.getChildByName(`pet${this.moveBox.pet.pos}`);
                    let petNode = Layer.getChildByName("pet");
                    let newLayer = this.formationLayer.getChildByName(`pet${this.movePos}`);
                    let child = newLayer.getChildByName("pet");
                    if (child) {
                        // 如果新位置有宠物
                        this.exchangePos(petNode, Layer, child, newLayer);
                    } else {
                        // 如果新位置没有宠物
                        petNode.removeFromParent();
                        newLayer.addChild(petNode);
                    }
                }
            } else {
                let petNode = this.formationLayer.getChildByName(`pet${this.movePos}`).getChildByName("pet");
                if (petNode) {
                    if (petNode.petId == this.movePet.petId) {
                        // 移动的宠物和放的宠物是同一个
                    } else {
                        // 移动的宠物和放的宠物不是同一个
                        console.log("替换");
                        this.ReplacePosPet();
                    }
                } else {
                    // 放的位置没有宠物
                    let node = this.formationLayer.getChildByName(`pet${this.movePos}`);
                    this.C2SAddToTeam(this.moveBox.pet.petId, this.movePos)
                    this.CreatePosPet(node);
                }
            }
        }
        this.movePet.removeFromParent();
    },
    ReplacePosPet() {
        // 替换宝可梦
        let node = this.formationLayer.getChildByName(`pet${this.movePos}`);
        let petNode = node.getChildByName("pet");
        if (petNode) {
            this.refreshScroll(petNode.petId, false, 0);
        }
        petNode.removeFromParent();
        this.CreatePosPet(node);
        this.C2SReplacePos();
    },
    refreshScroll(petId, active, pos) {
        for (let petBoxNode of this.content.children) {
            if (petBoxNode.petId == petId) {
                petBoxNode.pet.pos = pos;
                petBoxNode.getChildByName("selected").active = active;
                petBoxNode.getChildByName("mask").active = active;
            }
        }
    },
    CreatePosPet(node) {
        // 上阵新宠物
        //node.removeAllChildren();
        let petNode = cc.instantiate(RES_M.getRes("petPrefab", "pet"));
        petNode.petId = this.moveBox.pet.petId;
        petNode.pet = this.moveBox.pet;
        petNode.pet.pos = this.movePos;
        this.moveBox.pet.pos = this.movePos;
        let sk = petNode.getComponent(sp.Skeleton);
        sk.skeletonData = RES_M.getRes("petSpine", this.moveBox.pet.icon);
        sk.defaultAnimation = "standby_loop";
        sk.setAnimation(0, "standby_loop", true);
        node.addChild(petNode);
        this.moveBox.getChildByName("selected").active = true;
        this.moveBox.getChildByName("mask").active = true;
    },
    exchangePos(node1, Layer1, node2, Layer2) {
        // return;
        node1.removeFromParent();
        node2.removeFromParent();
        Layer1.addChild(node2);
        Layer2.addChild(node1);
        let pos = node1.pet.pos;
        node1.pet.pos = node2.pet.pos;
        node2.pet.pos = pos;
        this.exchangeBoxPos(node1.pet, node2.pet);
        this.C2SExchangePos(node1.pet.pos, node2.pet.pos)
    },
    exchangeBoxPos(pet1, pet2) {
        this.refreshScroll(pet1.petId, true, pet1.pos);
        this.refreshScroll(pet2.petId, true, pet2.pos);
    },
    C2SExchangePos(exchangePos, petPos) {
        net.send(this.protocol, 2, { serverId: net.serverId, exchangePos, petPos });
    },
    C2SReplacePos() {
        let petId = this.moveBox.pet.petId;
        let replacePos = this.movePos;
        net.send(this.protocol, 3, { serverId: net.serverId, petId, replacePos });
    },
    C2SAddToTeam(petId, addPos) {
        net.send(this.protocol, 4, { serverId: net.serverId, petId, addPos });
    },
    C2SAutoAddToTeam(petId) {
        net.send(this.protocol, 5, { serverId: net.serverId, petId });
    },
    C2SRemoveFromTeam(pet) {
        net.send(this.protocol, 6, { serverId: net.serverId, pet });
    },
    onmessage(sub, data) {
        if (sub == 1) {
            this.S2CAllBack(data);
        } else if (sub == 5) {
            this.S2CAutoAddToTeam(data);
        } else if (sub == 6) {
            this.S2CRemoveFromTeam(data);
        }
    },
    S2CAllBack(data) {
        let { curTeam, power } = data;
        this.updateData(curTeam, power);
    },
    S2CAutoAddToTeam(data) {
        let { curTeam, power, pet } = data;
        this.updateData(curTeam, power);
        let Layer = this.formationLayer.getChildByName(`pet${pet.pos}`);
        let petNode = cc.instantiate(RES_M.getRes("petPrefab", "pet"));
        petNode.petId = pet.petId;
        petNode.pet = pet;
        let sk = petNode.getComponent(sp.Skeleton);
        sk.skeletonData = RES_M.getRes("petSpine", pet.icon);
        sk.defaultAnimation = "standby_loop";
        sk.setAnimation(0, "standby_loop", true);
        Layer.addChild(petNode);
        this.refreshScroll(pet.petId, true, pet.pos);
    },
    S2CRemoveFromTeam(data) {
        let { curTeam, power, pet } = data;
        this.updateData(curTeam, power);
        let Layer = this.formationLayer.getChildByName(`pet${pet.pos}`);
        Layer.removeAllChildren();
        this.refreshScroll(pet.petId, false, pet.pos);
    },
    updateData(curTeam, power) {
        this.curTeam = curTeam;
        console.log(this.curTeam);
        curPlayer.getData().curTeam = curTeam;
        curPlayer.getData().power = power;
        this.powerLabel.string = power;
        this.formationLabel.string = `上阵精灵：${this.curTeam.length}/6`;
    },
    onDestroy() {
        Router.targetOff(this);
    },
    onDisable() {
        this.content.removeAllChildren();
        this.formationLayer.children.forEach(child => {
            child.removeAllChildren();
        });
    },
    onEnable() {
        this.init();
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.protocol = NET_PROTOCOL.NET_FORMATION;
        this.movePos = 0;
        Router.on(ChangeEvent.PetPos, (data) => {
            this.movePos ^= data;
        }, this);
        Router.on(this.protocol, (sub, data) => {
            this.onmessage(sub, data);
        }, this);
        cc.director.getCollisionManager().enabled = true;
        //cc.director.getCollisionManager().enabledDebugDraw = true;
    },

    start() {

    },

    // update (dt) {},
});