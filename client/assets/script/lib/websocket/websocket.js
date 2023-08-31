let ipAddress = {
    2: "www.simple-game.cn",
    1: "175.24.228.60",
}
class webConnect {
    constructor(url, port) {
        this._name = "";
        this._bag = [];
        this._port = port;
        this._url = url;
        this.connection(this._url, this._port);
    }

    connection(url, port, func) {
        this.app = new WebSocket(`ws://${url}:${port}/ws`);
        this.app.onmessage = (e) => {
            this.onmessage(JSON.parse(e.data));
        };
        this.app.onopen = () => {
            func && func();
        }
        this.app.onclose = (e) => {
            this.onclose(e.data);
        }
        this.app.onerror = (e) => {
            this.onerror(e.data);
        }
    }
    send(type, sub, data) {
        let message = JSON.stringify({ type, sub, data })
        if (this.app.readyState == 1) {
            this.app.send(message);
        } else {
            console.log("请稍后重试");
        }
    }

    onmessage(message) {
        let { type, sub, data } = message;
        //console.log(message)
        Router.emit(type, sub, data);
    }
    onclose(e) {
        console.log("链接断开", e);
    }
    onerror() {
        console.log("链接异常");
        this.connection(ipAddress[2], 10110);
    }
}

window.net = new webConnect(ipAddress[1], 10110);

window.NET_PROTOCOL = {
    NET_ACCOUNT: "account",
    NET_HALL: "hall",
    NET_BATTLE: "battle",
    NET_MAP: "map",
    NET_BAG: "bag",
    NET_DRAWCARD: "drawCard",
    NET_LOAD: "loading",
    NET_FORMATION: "formation",
    NET_PETBAG: "petBag",
    NET_SHOP: "shop",
    Map: "map",
    KEY_JOYSTICK: "joystick"
}
window.G_ServerList = {
    9002: {
        name: "服务器1",
        port: 9002,
        spriteFrame: "choose server_013"
    },
    9003: {
        name: "服务器2",
        port: 9003,
        spriteFrame: "choose server_014"
    },
    9004: {
        name: "服务器3",
        port: 9004,
        spriteFrame: "choose server_015"
    }
}