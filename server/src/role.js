class CRole {
    constructor(id, uId, avatar, nickname) {
        this.serverId = id
        this.uId = uId;
        this.nickname = nickname;
        this.level = 1;
        this.avatar = avatar;
        this.vipLevel = 0;
        this.coinNum = 100000;
        this.diamondNum = 20000;
        this._maxStrength = 80;
        this._curStrength = 80;
        this.curExp = 0;
        this.levelRatio = 1.25;
        this.bag = {};
        this.petBag = {};
        this.petId = 0;
        this.curTeam = {};
        this.map = {};
        this.createPet();
        this.createMap();
        this.online = true;
        this.offlineTime = 0;
        this.onlineTime = 0;
        this.isCountDown = false;
    }
    get curStrength() {
        return this._curStrength
    }
    set curStrength(value) {
        this._curStrength = value;
        if (this._curStrength < this.maxStrength && !this.isCountDown) {
            this.isCountDown = true;
            this.strengthRecover();
        }
    }
    get maxStrength() {
        return this._maxStrength + 4 * (this.level - 1);
    }

    set maxStrength(value) {
        this._maxStrength = value;
    }

    get curLevelExp() {
        return (Math.pow(this.level, 3) - Math.pow(this.level - 1, 3))
    }
    strengthRecover() {
        if (!this.online || this.curStrength >= this.maxStrength) {
            this.isCountDown = false;
            return
        }
        setTimeout(() => {
            this.curStrength++;
            log(this.curStrength, this.maxStrength)
            this.strengthRecover();
            Hall_M.S2CStrengthRecover(this.aObj, this._curStrength);
        }, 60000 * 10)
    }
    loginOut() {
        if (this.curStrength < this.maxStrength) {
            this.offlineTime = this.offlineTime || new Date().getTime();
        }
        this.isCountDown = false;
        this.online = false;
    }
    loginIn() {
        console.log("角色登录");
        this.onlineTime = new Date().getTime();
        let delta = 0;
        if (this.curStrength < this.maxStrength) {
            delta = this.onlineTime - this.offlineTime;
        }
        let strengthNum = Math.floor(delta / 60000 * 10);
        if (this.curStrength + strengthNum >= this.maxStrength) {
            this.curStrength = this.maxStrength;
            this.offlineTime = this.onlineTime = 0;
        } else {
            this.curStrength += strengthNum;
            this.offlineTime = this.onlineTime = 0;
        }
        this.online = true;
    }
    createPet(id) {
        for (let index = 1; index < 6; index++) {
            let pet = PetBase.createPet(index, ++this.petId);
            pet.level = index + Math.floor(Math.random() * 5);
            pet.pos = index;
            if (index > 2 && Object.keys(this.curTeam).length < 6) {
                this.curTeam[pet.pos] = pet;
            }
            pet.curEnergy = 300;
            this.petBag[this.petId] = pet;
        }
        let i = 5;
        while (i--) {
            let pet = PetBase.createPet(i + 1, ++this.petId);
            pet.level = 31;
            pet.curEnergy = 300;
            this.petBag[this.petId] = pet;
        }
    }
    getCurTeam() {
        let curTeam = [];
        for (let key in this.curTeam) {
            curTeam.push(this.curTeam[key].packToClient())
        }
        return curTeam;
    }
    completeRound(roundId, key, starNum) {
        let mapObj = this.map;
        let itemList = mapObj.completeRound(roundId, key, starNum);
        this.addItem(itemList);
        return itemList;
    }
    addItem(itemList) {
        for (let item of itemList) {
            if (this.bag[item.itemId]) {
                this.bag[item.itemId].num += item.num;
            } else {
                this.bag[item.itemId] = item;
            }
        }
    }
    addGoodItem(goods) {
        if (this.bag[goods.itemId]) {
            this.bag[goods.itemId].num += goods.num;
        } else {
            let item = ItemBase.createItem(goods.itemId);
            item.num = goods.num;
            this.bag[goods.itemId] = item;
        }
    }
    useItem(itemId, num) {
        if (this.bag[itemId]) {
            this.bag[itemId].num -= num;
            if (this.bag[itemId].num <= 0) {
                this.deleteItem(itemId);
            }
        }
    }
    createMap() {
        this.map = MapBase.createMap();
    }
    getMap() {
        return this.map.packToClient();
    }
    getEnemyTeam(key, id) {
        return this.map.getEnemyTeam(key, id)
    }
    addPet(petId) {
        let pet = PetBase.createPet(petId, ++this.petId);
        this.petBag[this.petId] = pet;
        return pet;
    }
    exchangePos(exchangePos, petPos) {
        log(exchangePos, petPos);
        let pet1Obj = this.curTeam[exchangePos];
        let pet2Obj = this.curTeam[petPos];
        pet1Obj.pos = petPos;
        pet2Obj.pos = exchangePos;
        this.curTeam[exchangePos] = this.curTeam[petPos];
        this.curTeam[petPos] = pet1Obj;
    }
    ReplacePos(replacePos, petId) {
        let petObj = this.curTeam[replacePos];
        let overObj;
        for (const key in this.petBag) {
            if (this.petBag[key].petId == petId) {
                overObj = this.petBag[key];
            }
        }
        if (petObj && overObj) {
            overObj.pos = petObj.pos;
            this.curTeam[replacePos] = overObj;
            petObj.pos = 0;
        }
    }
    addPos(addPos, petId) {
        log(this.curTeam, addPos, petId)
        if (addPos > 6 || addPos < 1) {
            return
        }
        this.curTeam[addPos] = this.petBag[petId];
        this.petBag[petId].pos = addPos;
    }
    addAutoPos(petId) {
        for (let index = 1; index <= 6; index++) {
            if (!this.curTeam[index]) {
                this.curTeam[index] = this.petBag[petId];
                this.petBag[petId].pos = index;
                return this.petBag[petId];
            }
        }
    }
    removePos(pet) {
        let pos = pet.pos;
        if (this.curTeam[pos]) {
            this.curTeam[pos].pos = 0;
            delete this.curTeam[pos];
        }
    }
    getPower() {
        let power = 0;
        let curTeam = this.getCurTeam();
        curTeam.forEach(s => {
            log(power);
            power += s.power
        });
        return power
    }
    addExp(num) {
        this.curExp += num;
        while (this.curExp > this.curLevelExp) {
            this.level++;
            this.curExp -= this.curLevelExp;
            log("获得" + num + "经验");
        }
    }
    deleteItem(itemId) {
        delete this.bag[itemId];
    }
    getPet(petId) {
        let pet = this.petBag[petId];
        if (pet) {
            pet = pet.packToClient();
        }
        return pet;
    }
    packToClient() {
        let petBag = this.packPetBag();
        let bag = this.packBag();
        let power = 0;
        let curTeam = this.getCurTeam();
        curTeam.forEach(s => {
            log(power);
            power += s.power
        });
        curTeam.sort((a, b) => {
            return b.id - a.id;
        });
        return {
            uid: this.uId,
            nickname: this.nickname,
            level: this.level,
            avatar: this.avatar,
            vipLevel: this.vipLevel,
            coinNum: this.coinNum,
            curLevelExp: this.curLevelExp,
            curExp: this.curExp,
            diamondNum: this.diamondNum,
            maxStrength: this.maxStrength,
            curStrength: this.curStrength,
            power,
            bag: bag,
            petBag,
            curTeam,
            map: this.map.packToClient(),
        }
    }
    packBag() {
        let bag = {};
        for (let key in this.bag) {
            bag[key] = this.bag[key].packToClient();
        }
        return bag
    }
    packPetBag() {
        let petBag = {};
        for (let key in this.petBag) {
            petBag[key] = this.petBag[key].packToClient();
        }
        return petBag
    }
    packBattleInfo() {
        return {
            level: this.level,
            coinNum: this.coinNum,
            curLevelExp: this.curLevelExp,
            curExp: this.curExp,
            maxStrength: this.maxStrength,
            curStrength: this.curStrength,
            curTeam: this.getCurTeam(),
        }
    }
}
module.exports = {
    createRole(id, uId, avatar, nickname) {
        return new CRole(id, uId, avatar, nickname)
    }
}