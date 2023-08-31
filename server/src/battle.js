class CBattle {
    constructor() {
        this.protocol = PROTOCOL.battle
    }
    onmessage(ws, sub, data) {
        switch (sub) {
            case 1:
                this.battleOver(ws, data);
                break;
        }
    }
    battleOver(ws, data) {
        let { won, serverId, totalRound, deadNNum, roundId, roundKey } = data;
        let aObj = ws.account
        if (!aObj)
            return
        let role = aObj.getRole(serverId);
        if (!role)
            return
        let num = 0;
        let getExp = 0;
        let itemList, roleInfo;
        let fillRound = totalRound < 20,
            fillDead = deadNNum < 3;
        if (!won) {
            role.curStrength--;
            this.S2CBattleLoss(ws, won, { curStrength: role.curStrength });
        } else {
            role.curStrength -= 8;
            num++;
            if (fillRound)
                num++;
            if (fillDead < 3)
                num++;
            // 完成关卡
            itemList = role.completeRound(roundId, roundKey, num);
            role.addExp(8);
            getExp = 8;
            roleInfo = role.packToClient();
            let curTeam = role.getCurTeam();
            this.S2CBattleWin(ws, won, itemList, curTeam, fillRound, fillDead, roleInfo, getExp);
        }
    }
    S2CBattleWin(ws, won, list, curTeam, fillRound, fillDead, roleInfo, getExp) {
        let itemList = [];
        for (let item of list) {
            itemList.push(item.packToClient())
        }
        SERVER.send(ws, this.protocol, 1, { won, curTeam, itemList, fillRound, fillDead, roleInfo, getExp })
    }
    S2CBattleLoss(ws, won, roleInfo) {
        SERVER.send(ws, this.protocol, 1, { won, roleInfo })
    }
}
global.battle = new CBattle()
module.exports = {
    onmessage(ws, sub, data) {
        battle.onmessage(ws, sub, data);
    }
}