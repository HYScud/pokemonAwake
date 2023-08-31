class CCD {
    constructor() {
        this._data = {};
    }
    getTime() {
        let time = new Date();
        return time.getTime();
    }
    setCD(key, time) {
        this._data[key] = {
            start: this.getTime(),
            time
        };
    }
    getCD(key) {
        if (!this._data[key]) {
            return 0;
        }
        let {
            start,
            time
        } = this._data[key];
        let now = this.getTime();
        if (now - start >= time * 1000) {
            delete this._data[key];
            return 0;
        }
        return (time - (now - start) / 1000).toFixed(1);
    }
}
let g_CD = new CCD();
let g_Tools = {
    setCD: (key, time) => {
        g_CD.setCD(key, time);
    },
    getCD: (key) => {
        return g_CD.getCD(key);
    },
    createCD(obj) {
        let cd = new CCD();
        obj.setCD = (key, time) => { cd.setCD(key, time) };
        obj.getCD = (key) => { return cd.getCD(key) };
    },
    isEmail(t) {
        return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(t);
    },
    formateNumLength(num) {
        if (num < 10) {
            return "0" + num;
        } else {
            return num;
        }
    },
    formateNum(num) {
        let unit;
        if (num >= 10000) {
            unit = 10000;
            num = num % unit == 0 ? num / unit : (num / unit).toFixed(2);
            return num + "万";
        } else if (num >= 100000000) {
            unit = 100000000;
            num = num % unit == 0 ? num / unit : (num / unit).toFixed(2);
            return num + "亿";
        } else {
            return num;
        }
    },
    formateStrength(cur, max) {
        if (cur > max) {
            return `<color=#00ff00>${cur}</c>`;
        } else if (cur == 0) {
            return `<color=#ff0000>${cur}</c>`;
        } else {
            return `<color=#000000>${cur}</c>`;
        }
    },
    formatColorNum(cur, max) {
        if (cur >= max) {
            return `<color=#00ff00>${cur}</c>`;
        } else if (cur < max) {
            return `<color=#ff0000>${cur}</c>`;
        }
    },
    sortByPower(petList) {
        for (let e of petList) {
            e.zIndex = -parseInt(e.pet.power);
        }
    },
    sortByLevel(petList) {
        for (let e of petList) {
            //let levelLayer = e.getChildByName("info") || e.getChildByName("levelLayer")
            e.zIndex = -parseInt(e.pet.level);
        }
    },
    sortByStarLevel(petList) {
        for (let e of petList) {
            e.zIndex = -parseInt(e.pet.starLevel);
        }
    },
    sortByName(petList) {

    },
    isContains(sourceList, id) {
        let flag = false;
        sourceList.forEach(element => {
            if (element.petId == id) {
                flag = true;
                return flag;
            }
        });
        return flag
    },
    initStar(starLayer, num) {
        starLayer.removeAllChildren();
        for (let index = 1; index <= Math.max(num, 6); index++) {
            let star = cc.instantiate(RES_M.getRes("starPrefab", "star"))
            if (index <= num && index <= 6) {
                star.getComponent(cc.Sprite).spriteFrame = RES_M.getRes("starIcon", "icon_star")
                starLayer.addChild(star);
            }
        }
    },
    initCultureStarLayer(starLayer, num) {
        starLayer.removeAllChildren();
        let overNum = 0;
        if (num > 6) {
            overNum = num - 6;
            num = 6;
        };
        for (let index = 1; index <= 6; index++) {
            let star = cc.instantiate(RES_M.getRes("starPrefab", "star"));
            if (index <= overNum) {
                star.getComponent(cc.Sprite).spriteFrame = RES_M.getRes("starIcon", "icon_star_z");
            } else if (index <= num) {
                star.getComponent(cc.Sprite).spriteFrame = RES_M.getRes("starIcon", "icon_star");
            } else {
                star.getComponent(cc.Sprite).spriteFrame = RES_M.getRes("starIcon", "icon_star_d");
            }
            starLayer.addChild(star);
        }
    },
    initBattleStar(starLayer, num, IconName) {
        for (let index = 0; index < starLayer.children.length; index++) {
            let star = starLayer.children[index];
            if (index < num) {
                star.getComponent(cc.Sprite).spriteFrame = RES_M.getRes("starIcon", IconName);
            } else {
                star.getComponent(cc.Sprite).spriteFrame = RES_M.getRes("starIcon", IconName + "_d");
            }
        }
    },
}
for (let name in g_Tools) {
    if (window[name]) console.log("key存在", key);
    window[name] = g_Tools[name];
}