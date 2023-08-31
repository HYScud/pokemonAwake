let express = require("express")

let expressWS = require("express-ws")

require("./lib/log");
global.RedisTool = require("./redis/redisClient");
global.RankNumTable = require("./rankNumTable");
global.ItemBase = require("./item");
global.SKillBase = require("./skill");
global.PetBase = require("./pet");
global.RoundBase = require("./round");
global.MapBase = require("./map");
global.PROTOCOL = {
    account: "account",
    battle: "battle",
    map: "map",
    bag: "bag",
    hall: "hall",
    drawCard: "drawCard",
    loading: "loading",
    formation: "formation",
    petBag: "petBag",
    shop: "shop",
}
let Router = {
    "shop": require("./shop"),
    "hall": require("./hall.js"),
    "account": require("./account"),
    "battle": require("./battle"),
    "map": require("./mapM"),
    "bag": require("./bag"),
    "drawCard": require("./drawCard"),
    "loading": require("./loading"),
    "formation": require("./formation"),
    "petBag": require("./petBag"),
}
class CServer {
    constructor() {
        this.app = {};
    }

    startServer() {
        this.app = express();
        expressWS(this.app);
        log("开启服务器")
        this.app.ws("/ws", (ws) => {
            console.log("链接");
            ws.on("message", (message) => {
                console.log(message)
                let data = JSON.parse(message)
                this.onmessage(ws, data)
            });

            ws.on("close", () => {
                ws.account && ws.account.loginOut()
            })
        })
        this.app.listen(10110);
    }

    onmessage(ws, data) {
        log("收到的数据", data.type, data.data)
        if (Router[data.type]) {
            Router[data.type].onmessage(ws, data.sub, data.data)
        }
    }

    send(ws, type, sub, data) {
        log("发送的数据", type, sub)
        ws.send(JSON.stringify({
            type,
            sub,
            data
        }))
    }

}
global.SERVER = new CServer();

module.exports = () => {
    SERVER.startServer();
}