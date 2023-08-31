const item = require("./item");

class CHall {
    constructor() {
        this.protocol = PROTOCOL.hall;
    }
    onmessage(ws, sub, data) {
        if (!ws.account) {
            return
        }
        if (sub == 2) {
            // 使用升级道具
            this.C2SUseItem(ws, data);
        } else if (sub == 3) {
            this.C2SRushRank(ws, data);
        }
    }
    C2SUseItem(ws, data) {
        let { petId, item } = data;
        let petObj = ws.account.curRole.petBag[petId];
        let itemObj = ws.account.curRole.bag[item.itemId];
        if (petObj && itemObj) {
            if (itemObj.num > 0) {
                itemObj.num--;
                if (itemObj.num == 0) {
                    ws.account.curRole.deleteItem(item.itemId)
                }
                petObj.addExp(itemObj.effectNum);
            }
        }
        this.S2CUseItem(ws, { pet: ws.account.curRole.getPet(petId), itemId: item.itemId, num: 1 });
    }

    C2SRushRank(ws, data) {
        let { petId } = data;
        let petObj = ws.account.curRole.petBag[petId];
        let itemList = rankNumTable[petObj.rankNum];
        for (const item of itemList) {
            let psItem = ws.account.curRole.bag[item.itemId];
            if (!psItem || psItem.num < item.num) {
                return;
            }
        }
        for (const item of itemList) {
            ws.account.curRole.useItem(item.itemId, item.num);
        }
        petObj.rankNum++;
        this.S2CRushRank(ws, { pet: petObj.packToClient(), bag: ws.account.curRole.packBag() })
    }
    S2CStrengthRecover(aObj, curStrength) {
        if (aObj && aObj.ws) {
            SERVER.send(aObj.ws, this.protocol, 1, { curStrength })
        }
    }

    S2CUseItem(ws, data) {
        SERVER.send(ws, this.protocol, 2, data)
    }
    S2CRushRank(ws, data) {
        if (ws) {
            SERVER.send(ws, this.protocol, 3, data)
        }
    }
}
global.Hall_M = new CHall();
module.exports = {
    onmessage(ws, sub, data) {
        Hall_M.onmessage(ws, sub, data);
    }
}