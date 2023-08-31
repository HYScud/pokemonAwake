class player {
    constructor() {
        this._data = {};
    }
    setData(data) {
        this._data = data;
    }
    getData() {
        return this._data;
    }
    getPetBag() {
        return this._data.petBag;
    }
    getLeveLItem() {
        let levelItem = {};
        for (let key in this._data.bag) {
            if (this._data.bag[key].type == 2) {
                levelItem[key] = this._data.bag[key];
            }
        }
        return levelItem;
    }
}
window.curPlayer = window.curPlayer || new player();