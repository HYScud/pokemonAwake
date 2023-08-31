// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        petContent: cc.Node,
        filterLayer: cc.Node,
        sortLabel: cc.Label,
        sortIcon: cc.Sprite,
        sortShow: false,
        capacityLabel: cc.Label,
    },
    onClick(e, custom) {
        Audio_M.play("click_1", false, "sound");
        if (custom == "close") {
            this.node.active = false;
        } else if (custom == "sortShow") {
            this.sortShow = !this.sortShow;
            this.filterLayer.active = this.sortShow;
        }
    },
    init(petBag) {
        let allPet = Object.values(petBag);
        allPet.sort((a, b) => {
            return b.power - a.power;
        });
        console.log(this.capacityLabel)
        this.capacityLabel.string = "精灵容量：" + allPet.length + "/150";
        if (allPet.length > 12) {
            this.batchIndex = 0;
            this.batchNum = 12;
            this.batchLoad(allPet);
        } else {
            for (let pet of allPet) {
                this.addPet(pet);
            }
        }
        this.initSortBtn();
    },
    initCard(node, pet) {
        let bottom = node.getChildByName("bottom");
        node.getComponent(cc.Sprite).spriteFrame = RES_M.getRes('cardImg', "bg_" + pet.quality);
        node.getChildByName("frame").getComponent(cc.Sprite).spriteFrame = RES_M.getRes('cardImg', "frame_" + pet.quality);
        node.getChildByName("img").getComponent(cc.Sprite).spriteFrame = RES_M.getRes('petIconBag', pet.icon);
        bottom.getComponent(cc.Sprite).spriteFrame = RES_M.getRes('cardImg', "box_bottom_d" + pet.quality);
        node.getChildByName("quality").getComponent(cc.Sprite).spriteFrame = RES_M.getRes("qualityIcon", pet.quality);
        bottom.getChildByName("powerLayer").getChildByName("power").getComponent(cc.Label).string = pet.power;
        let info = bottom.getChildByName("info");
        info.getChildByName("level").getComponent(cc.Label).string = pet.level;
        info.getChildByName("name").getComponent(cc.Label).string = pet.name;
        let attrLayer = node.getChildByName("attr");
        for (let id of pet.attr) {
            let attrNode = cc.instantiate(RES_M.getRes('petPrefab', "attr"));
            attrNode.getComponent(cc.Sprite).spriteFrame = RES_M.getRes('skillIcon', id);
            attrLayer.addChild(attrNode);
        }
    },
    batchLoad(allPet) {
        if (this.batchIndex >= allPet.length) {
            return;
        }
        for (let index = this.batchIndex; index < Math.min(this.batchIndex + this.batchNum, allPet.length); index++) {
            let pet = allPet[index];
            this.addPet(pet);
        };
        this.batchIndex += this.batchNum;
        this.setTimeId = setTimeout(() => {
            this.batchLoad(allPet);
        }, 800);
    },
    addPet(pet) {
        let node = cc.instantiate(RES_M.getRes('petPrefab', "petCard"));
        node.pet = pet;
        this.initCard(node, pet);
        this.addListen(node);
        this.petContent.addChild(node);
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
    addListen(node) {
        node.on(cc.Node.EventType.TOUCH_END, () => {
            cc.find("Canvas/petUI").active = true;
        })
    },
    onClickSort(node) {
        Audio_M.play("click_1", false, "sound");
        if (this.sortSelected.index == node.index) {
            return;
        }
        this.sortSelected.getChildByName("selected").active = false;
        this.sortSelected.getChildByName("name").color = new cc.Color(255, 59, 59, 255);
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
    C2SGetAllPet() {
        net.send(this.protocol, 1, { serverId: net.serverId });
    },
    onmessage(sub, data) {
        if (sub == 1) {
            let { petBag } = data;
            this.S2CGetAllPet(petBag);
        }
    },
    S2CGetAllPet(petBag) {
        this.init(petBag);
    },
    // LIFE-CYCLE CALLBACKS:
    onDisable() {
        clearTimeout(this.setTimeId);
        this.petContent.removeAllChildren();
    },
    onDestroy() {
        Router.targetOff(this);
    },
    onLoad() {
        this.protocol = NET_PROTOCOL.NET_PETBAG;
        Router.on(this.protocol, (sub, data) => {
            this.onmessage(sub, data)
        }, this);
    },
    onEnable() {
        this.C2SGetAllPet();
    },
    // onLoad () {},

    start() {},

    // update (dt) {},
});