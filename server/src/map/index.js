let allRound = {
    round1: {
        mapBg: "zxz",
        list: ["1", "2", "3", "4", "5"],
        index: 0,
        complete: false
    },
    round2: {
        mapBg: "zxz",
        list: ["6", "7", "8", "9", "10"],
        index: 0,
        complete: false
    }
}
class CMap {
    constructor() {
        this.data = {};
        this.curIndex = 1;
        this.initRound();
    }
    initRound() {
        for (let key in allRound) {
            if (!this.data[key]) {
                this.createRound(key);
            }
        }
    }
    createRound(key) {
        this.data[key] = {};
        this.data[key].mapBg = allRound[key].mapBg;
        this.data[key].index = allRound[key].index;
        this.data[key].list = [];
        this.data[key].complete = allRound[key].complete;
        let list = allRound[key].list;
        if (list && list.length > 0) {
            for (let id of list) {
                let round = RoundBase.createRound(id);
                this.data[key].list.push(round);
            }
        }
    }
    addRound() {
        for (let key in allRound) {
            if (!this.data[key]) {
                this.createRound(key);
            }
        }
    }
    addRoundByKey(key) {
        if (!this.data[key]) {
            this.data[key].mapBg = allRound[key].mapBg;
            this.data[key].index = allRound[key].index;
            this.data[key].list = [];
            this.data[key].complete = allRound[key].complete;
            if (!this.data[key]) {
                let list = allRound[key].list;
                if (list && list.length > 0) {
                    for (let id of list) {
                        let round = RoundBase.createRound(id)
                        this.data[key].list.push(round)
                    }
                }
            }
        }
    }
    completeRound(roundId, key, starNum) {
        if (roundId % 5 == 0) {
            this.data[key].complete = true;
        }
        this.data[key].index++;
        let roundObj = this.data[key].list[(roundId - 1) % 5];
        let itemList = roundObj.complete(starNum);
        return itemList;
    }
    getEnemyTeam(key, id) {
        let roundObj = this.data[key].list[(id - 1) % 5];
        return roundObj.getEnemyTeam();
    }
    packToClient() {
        let data = {};
        for (let key in this.data) {
            data[key] = {};
            data[key].complete = this.data[key].complete;
            data[key].index = this.data[key].index;
            data[key].mapBg = this.data[key].mapBg;
            data[key].list = [];
            for (let round of this.data[key].list) {
                let temp = round.packToClient();
                data[key].list.push(temp);
            }
        }
        return {
            data,
            curIndex: this.curIndex
        }
    }
}
module.exports = {
    createMap() {
        return new CMap();
    }
}