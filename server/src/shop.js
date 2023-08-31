let goods = {
    1: { itemId: 2, name: "能量核心", num: 20, cost: 120000, isSellOut: false, icon: "2" },
    2: { itemId: 2, name: "能量核心", num: 5, cost: 30000, isSellOut: false, icon: "2" },
    3: { itemId: 10, name: "荧绿草元晶石", num: 1, cost: 8000, isSellOut: false, icon: "icon_grass_green" },
    4: { itemId: 10, name: "荧绿草元晶石", num: 5, cost: 30000, isSellOut: false, icon: "icon_grass_green" },
    5: { itemId: 11, name: "荧绿火元晶石", num: 2, cost: 16000, isSellOut: false, icon: "icon_fire_green" },
    6: { itemId: 11, name: "荧绿火元晶石", num: 5, cost: 30000, isSellOut: false, icon: "icon_fire_green" },
    7: { itemId: 12, name: "荧绿水元晶石", num: 2, cost: 16000, isSellOut: false, icon: "icon_walter_green" },
    8: { itemId: 12, name: "荧绿水元晶石", num: 5, cost: 30000, isSellOut: false, icon: "icon_walter_green" },
    9: { itemId: 4, name: "甘甜汽水", num: 3, cost: 3000, isSellOut: false, icon: "jy_1" },
    10: { itemId: 5, name: "浸爽汽水", num: 3, cost: 10000, isSellOut: false, icon: "jy_2" },
}
class CShop {
    constructor() {
        this.protocol = PROTOCOL.shop;
        this.allGoods = {};
        this.initShop();
    }
    initShop() {
        for (let key in goods) {
            this.allGoods[key] = goods[key];
        }
    }
    onmessage(ws, sub, data) {
        if (!ws.account || !ws.account.curRole) {
            return;
        }
        if (sub == 1) {
            this.C2SGetAllGoods(ws);
        } else if (sub == 2) {
            let { key } = data;
            this.C2SBuyGoods(ws, key);
        }
    }
    C2SGetAllGoods(ws) {
        this.S2CGetAllGoods(ws, { allGoods: this.allGoods });
    }

    C2SBuyGoods(ws, key) {
        let goods = this.allGoods[key];
        let money = ws.account.curRole.coinNum;
        if (goods.cost > money) {
            return
        }
        ws.account.curRole.coinNum -= goods.cost;
        ws.account.curRole.addGoodItem(goods);
        goods.isSellOut = true;
        this.S2CBuyGoods(ws, { key, goods, money: ws.account.curRole.coinNum, bag: ws.account.curRole.packBag() })
    }
    S2CGetAllGoods(ws, data) {
        SERVER.send(ws, this.protocol, 1, data);
    }
    S2CBuyGoods(ws, data) {
        SERVER.send(ws, this.protocol, 2, data);
    }
}
let shop = new CShop();
module.exports = {
    onmessage(ws, sub, data) {
        shop.onmessage(ws, sub, data);
    }
}