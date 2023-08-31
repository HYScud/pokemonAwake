class CMapManager {
    constructor() {
        this.protocol = PROTOCOL.map
    }
    onmessage(ws, sub, data) {
        switch (sub) {
            case 1:
                this.C2SGetMap(ws, data);
                break;
        }
    }
    C2SGetMap(ws, data) {
        let { serverId } = data;
        let aObj = ws.account;
        if (!aObj)
            return
        let role = aObj.getRole(serverId);
        if (!role)
            return
        let mapObj = role.getMap();
        this.S2CGetMap(ws, mapObj);
    }
    S2CGetMap(ws, data) {
        SERVER.send(ws, this.protocol, 1, data)
    }
}
global.Map_M = new CMapManager()
module.exports = {
    onmessage(ws, sub, data) {
        Map_M.onmessage(ws, sub, data);
    }
}