let diamondCard = {
    5: {
        list: [{ petId: 2, icon: "liekongzuo" }, { petId: 5, icon: "jiekeluomu" }],
        chance: 1,
    },
    4: {
        list: [{ petId: 1, icon: "banjilasi" }, { petId: 6, icon: "chaojipenhuolongx" }],
        chance: 10,
    },
    3: {
        list: [{ petId: 9, icon: "wanli" }, { petId: 8, icon: "pikaqui" }, { petId: 4, icon: "bobo" }, ],
        chance: 36,
    },
    2: {
        list: [{ petId: 7, icon: "niduolan" }, ],
        chance: 53,
    },
}
class DrawCard {
    constructor() {
        this.protocol = PROTOCOL.drawCard;
    }
    onmessage(ws, sub, data) {
        if (!ws.account) {
            return
        }
        let {
            serverId,
            type
        } = data;
        let role = ws.account.getRole(serverId);
        if (!role) {
            return
        }
        let { num } = data;
        switch (sub) {
            case 1:
                let consume = num == 1 ? 200 : 1800;
                log(consume, role.diamondNum)
                if (consume > role.diamondNum) {
                    return
                }
                role.diamondNum -= consume;
                this.C2SGetDiamondCard(ws, num, role, consume, type);
                break;
        }
    }
    C2SGetDiamondCard(ws, num, role, consume, type) {
        let rewardList = []
        for (let index = 0; index < num; index++) {
            let key = this.random();
            let petId = this.randomPet(key, role);
            let pet = role.addPet(petId);
            rewardList.push(pet.packToClient());
        }
        this.S2CGetDiamondCard(ws, rewardList, num, consume, type);
    }
    C2SGetCoinCard() {

    }
    S2CGetDiamondCard(ws, rewardList, num, consume, type) {
        SERVER.send(ws, this.protocol, 1, { rewardList, num, consume, type });
    }
    random() {
        let key = 0;
        let randomNum = Math.floor(Math.random() * 100 + 1);
        if (randomNum <= 53) {
            key = 2;
        } else if (randomNum <= 89) {
            key = 3;
        } else if (randomNum <= 99) {
            key = 4;
        } else {
            key = 5;
        }
        return key;
    }
    randomPet(key) {
        let randomNum = Math.floor(Math.random() * diamondCard[key].list.length);
        let petId = diamondCard[key].list[randomNum].petId;
        return petId;
    }
}
global.drawCard = new DrawCard();
module.exports = {
    onmessage(ws, sub, data) {
        drawCard.onmessage(ws, sub, data);
    }
}