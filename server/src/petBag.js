class CPetBag {
    constructor() {
        this.protocol = PROTOCOL.petBag;
    }
    onmessage(ws, sub, data) {
        log(sub);
        switch (sub) {
            case 1:
                this.C2SGetAllPet(ws, data);
                break;
        }
    }
    C2SGetAllPet(ws, data) {
        let { serverId } = data;
        log(serverId);
        if (!ws.account)
            return
        let role = ws.account.getRole(serverId);
        if (!role)
            return
        let petBag = role.packPetBag();
        this.S2CGetAllPet(ws, petBag);
    }
    S2CGetAllPet(ws, petBag) {
        SERVER.send(ws, this.protocol, 1, { petBag })
    }
}
global.petBag_M = new CPetBag();
module.exports = {
    onmessage(ws, sub, data) {
        petBag_M.onmessage(ws, sub, data);
    }
}