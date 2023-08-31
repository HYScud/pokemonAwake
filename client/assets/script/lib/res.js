class CResManager {
    constructor() {
        this._data = {};
        this.loadResNum = 0;
    }

    getLoadResNum() {
        return this.loadResNum;
    }
    startLoad(index) {
        for (const key in RES_TABLE[index]) {
            this._data[key] = {};
            this.loadResNum += RES_TABLE[index][key].list.length;
            this.LoadRes(index, key);
        }
    }
    LoadRes(index, key) {
        let resList = []
        for (const name of RES_TABLE[index][key].list) {
            let resPath = RES_TABLE[index][key].path + "/" + name;
            resList.push(resPath);
        }
        let func = () => {
            if (!resList.length) {
                return;
            }
            let resPath = resList.splice(0, 5);
            cc.loader.loadResArray(resPath, RES_TABLE[index][key].type, (err, res) => {
                if (err) {
                    console.log(err, key);
                } else {
                    this.loadResNum -= res.length;
                    res.forEach(s => {
                        //console.log(s, s.name)
                        this._data[key][s.name] = s;
                    })
                    func();
                }
            })
        }
        func();
    }

    getRes(key, name) {
        //console.log(key, name)
        if (!this._data[key]) {
            console.log("当前key不存在", key);
            return
        }
        return this._data[key][name];
    }
}

window.RES_M = new CResManager();