class CRoundBase {
    constructor() {
        this.id = 0;
        this.index = "1-1"
        this.name = "水边小道";
        this.star = 0;
        this.type = 0;
        this.boss = {};
        this.key = 0;
        this.monsterList = [
            []
        ];
        this.itemList = [];
        this.monsterId = 10000;
    }
    createBoss() {
        let bossObj = PetBase.createPet(this.boss.id, 0, this.boss.level, this.boss.pos);
        this.boss = bossObj;
    }
    createMonsterList() {
        let monsterList = [];
        for (let i = 0; i < this.monsterList.length; i++) {
            monsterList[i] = [];
            for (let j = 0; j < this.monsterList.length; j++) {
                let info = this.monsterList[i][j];
                let petObj = PetBase.createPet(info.id, this.monsterId++, info.level, info.pos, info.rankNum)
                monsterList[i].push(petObj);
            }
        }
        this.monsterList = monsterList;
    }
    createItemList() {
        let itemList = [];
        for (let i = 0; i < this.itemList.length; i++) {
            let info = this.itemList[i];
            let itemObj = ItemBase.createItem(info.itemId)
            itemList.push(itemObj);
        }
        this.itemList = itemList;
    }
    packToClient() {
        let monsterList = [],
            itemList = [];
        for (let index = 0; index < this.monsterList.length; index++) {
            monsterList[index] = [];
            for (let i = 0; i < this.monsterList[index].length; i++) {
                monsterList[index].push(this.monsterList[index][i].packToClient())
            }
        }
        for (let index = 0; index < this.itemList.length; index++) {
            itemList.push(this.itemList[index].packToClient());
        }
        return {
            id: this.id,
            index: this.index,
            key: this.key,
            name: this.name,
            star: this.star,
            type: this.type,
            boss: this.boss.packToClient(),
            monsterList,
            itemList,
        }
    }
    complete(starNum) {
        this.star = starNum;
        let itemList = [];
        for (let item of this.itemList) {
            //log(item.maxNum, Math.random() * item.maxNum + 1)
            let num = Math.floor(Math.random() * item.maxNum + 1)
            let itemObj = ItemBase.createItem(item.itemId, num);
            itemList.push(itemObj);
        }
        return itemList;
    }
    getEnemyTeam() {
        let monsterList = [];
        for (let index = 0; index < this.monsterList.length; index++) {
            monsterList[index] = [];
            for (let i = 0; i < this.monsterList[index].length; i++) {
                monsterList[index].push(this.monsterList[index][i].packToClient())
            }
        }
        return monsterList;
    }
}
let allRound = null;
module.exports = {
    CRoundBase: CRoundBase,
    createRound(id) {
        allRound = allRound || require("./load")
        return new allRound[id]();
    }
}