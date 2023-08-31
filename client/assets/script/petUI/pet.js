// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        petNameLabel: cc.Label,
        starLayer: cc.Node,
        attrLayer: cc.Node,
        petNode: cc.Node,
        powerLabel: cc.Label,
        petDetailLayer: cc.Node,
        petContent: cc.Node,
        filterLayer: cc.Node,
        sortLabel: cc.Label,
        sortIcon: cc.Sprite,
        sortShow: false,
        menuLayer: cc.Node,
        rankNumLayer: cc.Node,
        panelIndex: 0,
    },

    init() {
        let petList = curPlayer.getData().petBag;
        petList = Object.values(petList);
        petList.sort((a, b) => {
            return b.power - a.power;
        });
        this.initScroll(petList);
    },
    initScroll(petList) {
        if (petList.length > 12) {
            this.batchIndex = 0;
            this.batchNum = 12;
            this.batchAdd(petList);
        } else {
            this.addAllPet(petList);
        }
    },
    addAllPet(petList) {
        petList.forEach(pet => {
            this.addPetBox(pet);
        });
    },
    batchAdd(allPet) {
        if (this.batchIndex >= allPet.length) {
            return;
        }
        for (let index = this.batchIndex; index < Math.min(this.batchIndex + this.batchNum, allPet.length); index++) {
            let petInfo = allPet[index];
            this.addPetBox(petInfo);
        }
        this.batchIndex += this.batchNum;
        setTimeout(() => {
            this.batchAdd(allPet);
        }, 800);
    },
    addPetBox(pet) {
        let petNode = cc.instantiate(RES_M.getRes("petPrefab", "petBox"));
        petNode.scale = 0.5;
        initStar(petNode.getChildByName("starLayer"), pet.starLevel);
        petNode.petId = pet.petId;
        petNode.pet = pet;
        this.petContent.addChild(petNode);
        petNode.script.init(pet);
        if (!this.selected) {
            this.selected = petNode;
            this.selected.getChildByName("box_selected").active = true;
            this.petInfoShow(petNode.pet);
            this.initPanelShow(petNode.pet);
        }
        petNode.on(cc.Node.EventType.TOUCH_END, (e) => {
            this.petNodeClick(e, petNode);
        });
    },
    petNodeClick(e, petNode) {
        Audio_M.play("click_1", false, "sound");
        if (petNode.petId == this.selected.petId) {
            return;
        }
        this.selected.getChildByName("box_selected").active = false;
        this.selected = petNode;
        this.selected.getChildByName("box_selected").active = true;
        this.petInfoShow(petNode.pet);
        this.initPanelShow(this.selected.pet);
    },
    petInfoShow(pet) {
        this.petNameLabel.string = pet.name;
        this.initAttr(pet.attr);
        this.powerLabel.string = "战：" + pet.power;
        initCultureStarLayer(this.starLayer, pet.starLevel);
        let sk = this.petNode.getComponent(sp.Skeleton);
        sk.skeletonData = RES_M.getRes("petSpine", pet.icon);
        sk.defaultAnimation = "standby_loop";
        sk.setAnimation(0, "standby_loop", true);
        // this.sortShow = !this.sortShow;
        // this.filterLayer.active = this.sortShow;
    },
    initAttr(attr) {
        this.attrLayer.removeAllChildren();
        attr.forEach(element => {
            let node = cc.instantiate(RES_M.getRes("petPrefab", "attr"));
            node.getComponent(cc.Sprite).spriteFrame = RES_M.getRes("skillIcon", element);
            //node.scale = 0.7;
            this.attrLayer.addChild(node);
        });
    },
    initPanelShow(pet) {
        console.log(this.panelIndex)
        switch (this.panelIndex) {
            case 0:
                console.log(pet);
                this.petDetailLayer.active = true;
                this.rankNumLayer.active = false;
                this.petDetailLayer.script.init(pet);
                break;
            case 1:
                console.log(pet);
                this.petDetailLayer.active = false;
                this.rankNumLayer.active = true;
                this.rankNumLayer.script.init(pet);
                break;
        }
    },
    onClick(e, custom) {
        Audio_M.play("click_1", false, "sound");
        if (custom == "close") {
            this.node.active = false;
        } else if (custom = "sort") {
            this.sortShow = !this.sortShow;
            this.filterLayer.active = this.sortShow;
        }
    },
    menuClick(e, custom) {
        console.log(this.panelIndex, custom, this.panelIndex == custom);
        if (this.panelIndex == custom) {
            return;
        }
        this.menuLayer.children[this.panelIndex].getChildByName("tab_selected").active = false;
        this.panelIndex = parseInt(custom);
        this.menuLayer.children[this.panelIndex].getChildByName("tab_selected").active = true;
        this.initPanelShow(this.selected.pet);
    },
    initSortBtn() {
        for (let index = 0; index < this.filterLayer.children.length; index++) {
            let node = this.filterLayer.children[index];
            node.index = index;
            if (!this.sortSelected) {
                this.sortSelected = node;
            }
            node.on(cc.Node.EventType.TOUCH_START, () => {
                this.onClickSort(node);
            })
        }
    },
    onClickSort(node) {
        console.log("点击排序");
        Audio_M.play("click_1", false, "sound");
        if (this.sortSelected.index == node.index) {
            return
        }
        this.sortSelected.getChildByName("selected").active = false;
        this.sortSelected.getChildByName("name").color = new cc.Color(255, 59, 59, 255)
        node.getChildByName("selected").active = true;
        node.getChildByName("name").color = new cc.Color(255, 255, 255, 255);
        this.sortSelected = node;
        this.sortLabel.string = node.getChildByName("name").getComponent(cc.Label).string;
        this.toSort(node.index);
    },
    toSort(index) {
        switch (index) {
            case 0:
                sortByPower(this.petContent.children);
                break;
            case 1:
                sortByLevel(this.petContent.children);
                break;
            case 2:
                sortByStarLevel(this.petContent.children);
                break;
            case 3:
                sortByName(this.petContent.children);
                break;
        }
    },
    useItem(data) {
        this.C2SUseLevelItem(data);
    },
    C2SUseLevelItem(data) {
        net.send(this.protocol, 2, { petId: this.selected.petId, item: data });
    },
    S2CUseLevelItem(data) {
        let { pet, itemId, num } = data;
        curPlayer.getData().petBag[pet.petId] = pet;
        let item = curPlayer.getData().bag[itemId];
        if (item && item.num - num > 0) {
            item.num = num;
        } else {
            delete curPlayer.getData().bag[itemId];
        }
        this.selected.script.init(pet);
        this.petInfoShow(pet);
        this.initPanelShow(this.selected.pet);
        this.petDetailLayer.script.init(pet, itemId);
    },
    S2CRushRank(data) {
        console.log(data);
        let { pet, bag } = data;
        curPlayer.getData().bag = bag;
        if (pet.petId == this.selected.petId) {
            this.selected.script.init(pet);
            this.selected.pet = pet;
            this.petInfoShow(pet);
            this.initPanelShow(this.selected.pet);
        } else {
            for (const child of this.petContent.children) {
                if (child.petId == pet.petId) {
                    child.script.init(pet);
                    this.initPanelShow(pet);
                }
            }
        }

    },
    onmessage(sub, data) {
        if (sub == 2) {
            this.S2CUseLevelItem(data);
        } else if (sub == 3) {
            this.S2CRushRank(data);
        }
    },
    onEnable() {
        this.init();
    },
    onDestroy() {
        Router.targetOff(this);
        Router.off(ChangeEvent.useItem);
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.protocol = NET_PROTOCOL.NET_HALL;
        Router.on(ChangeEvent.useItem, (data) => {
            this.useItem(data);
        });
        Router.on(this.protocol, (sub, data) => {
            this.onmessage(sub, data);
        }, this);
        this.node.script = this;
    },

    start() {
        this.initSortBtn()
    },

    // update (dt) {},
});