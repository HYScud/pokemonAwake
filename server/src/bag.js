class CBagManager {
    constructor() {
        this.protocol = PROTOCOL.bag
    }
    onmessage(ws, sub, data) {
        switch (sub) {
            case 1:
                this.C2SAllItem(ws, data);
                break;
        }
    }
    C2SAllItem(ws, data) {
        let { serverId } = data;
        log(serverId)
        if (!ws.account)
            return
        let role = ws.account.getRole(serverId);
        if (!role)
            return
        let bag = role.packBag();
        this.S2CGetAllItem(ws, bag);
    }
    S2CGetAllItem(ws, data) {
        SERVER.send(ws, this.protocol, 1, data)
    }
}
global.Bag_M = new CBagManager()
module.exports = {
    onmessage(ws, sub, data) {
        Bag_M.onmessage(ws, sub, data);
    }
}