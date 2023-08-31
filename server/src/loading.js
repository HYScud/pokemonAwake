class CLoading {
    constructor() {
        this.protocol = PROTOCOL.loading;
    }
    onmessage(ws, sub, data) {
        switch (sub) {
            case 1:
                this.C2SGetBattleInfo(ws, data);
                break;
        }
    }
    C2SGetBattleInfo(ws, data) {
        let { serverId, roundId, roundKey } = data;
        let playerTeam, enemyTeam;
        if (ws.account) {
            let role = ws.account.getRole(serverId);
            if (role) {
                playerTeam = role.getCurTeam();
                enemyTeam = role.getEnemyTeam(roundKey, roundId);
                this.S2CGetBattleInfo(ws, playerTeam, enemyTeam, roundId, roundKey)
            }
        }
    }
    S2CGetBattleInfo(ws, playerTeam, enemyTeam, id, key) {
        SERVER.send(ws, this.protocol, 1, { playerTeam, enemyTeam, id, key })
    }
}
global.loading_M = new CLoading();
module.exports = {
    onmessage(ws, sub, data) {
        loading_M.onmessage(ws, sub, data);
    }
}