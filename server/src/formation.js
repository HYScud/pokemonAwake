class Formation {
    constructor() {
        this.protocol = PROTOCOL.formation;
    }
    onMessage(ws, sub, data) {
        if (sub == 1) {
            let { account, petId, serverId } = data;
            this.C2SRemoveFromTeam(ws, account, serverId, petId)
        } else if (sub == 2) {
            let { exchangePos, petPos, serverId } = data;
            this.C2SExchangePos(ws, serverId, exchangePos, petPos);
        } else if (sub == 3) {
            let { replacePos, petId, serverId } = data;
            this.C2SReplacePos(ws, serverId, replacePos, petId);
        } else if (sub == 4) {
            let { addPos, petId, serverId } = data;
            this.C2SAddToTeam(ws, serverId, addPos, petId);
        } else if (sub == 5) {
            let { petId, serverId } = data;
            this.C2SAutoAddToTeam(ws, serverId, petId);
        } else if (sub == 6) {
            let { serverId, pet } = data;
            this.C2SRemoveFromTeam(ws, serverId, pet);
        }
    }
    C2SRemoveFromTeam(ws, serverId, pet) {
        let role = ws.account.getRole(serverId);
        if (role) {
            role.removePos(pet);
            let curTeam = role.getCurTeam();
            let power = role.getPower();
            this.S2CRemoveFromTeam(ws, curTeam, power, pet);
        }
    }
    C2SExchangePos(ws, serverId, exchangePos, petPos) {
        let role = ws.account.getRole(serverId);
        if (role && !this.checkIsExist(role, petId)) {
            role.exchangePos(exchangePos, petPos);
            let curTeam = role.getCurTeam();
            let power = role.getPower();
            this.S2CBackToClient(ws, curTeam, power);
        }
    }
    C2SReplacePos(ws, serverId, replacePos, petId) {
        let role = ws.account.getRole(serverId);
        if (role && !this.checkIsExist(role, petId)) {
            role.ReplacePos(replacePos, petId);
            let curTeam = role.getCurTeam();
            let power = role.getPower();
            log(curTeam)
            this.S2CBackToClient(ws, curTeam, power);
        }
    }
    C2SAddToTeam(ws, serverId, addPos, petId) {
        log("添加宠物")
        let role = ws.account.getRole(serverId);
        if (role && !this.checkIsExist(role, petId)) {
            role.addPos(addPos, petId);
            let curTeam = role.getCurTeam();
            let power = role.getPower();
            this.S2CBackToClient(ws, curTeam, power);
        }
    }
    C2SAutoAddToTeam(ws, serverId, petId) {
        let role = ws.account.getRole(serverId);
        if (role && !this.checkIsExist(role, petId)) {
            let pet = role.addAutoPos(petId);
            let curTeam = role.getCurTeam();
            let power = role.getPower();
            this.S2CAutoAddToTeam(ws, curTeam, power, pet);
        }
    }
    checkIsExist(role, petId) {
        let curTeam = role.curTeam;
        for (const key in curTeam) {
            if (curTeam[key].petId == petId) {
                return true;
            }
        }
        return false
    }
    S2CBackToClient(ws, curTeam, power) {
        SERVER.send(ws, this.protocol, 1, { curTeam, power })
    }
    S2CAutoAddToTeam(ws, curTeam, power, pet) {
        SERVER.send(ws, this.protocol, 5, { curTeam, power, pet })
    }
    S2CRemoveFromTeam(ws, curTeam, power, pet) {
        SERVER.send(ws, this.protocol, 6, { curTeam, power, pet })
    }
}
global.formate_M = new Formation();
module.exports = {
    onmessage(ws, sub, data) {
        formate_M.onMessage(ws, sub, data)
    }
}