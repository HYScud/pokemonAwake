class CObj {
    constructor() {
        this._data = {};
    }
    addObj(id, obj) {
        if (!this._data[id]) this._data[id] = obj;
    }

    deleteObj(id) {
        if (this._data[id]) delete this._data[id];
    }
    getObj(id) {
        return this._data[id];
    }
    getAllObj() {
        return Object.values(this._data);
    }
    deleteAllObj() {
        this._data = {};
    }
    getSelf() {
        return this._data[this.self];
    }
    isSelf(id) {
        return this.self == id;
    }
}
window.g_Obj = new CObj()