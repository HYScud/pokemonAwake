
class Round1 extends RoundBase.CRoundBase {
    constructor() {
        super();
        this.id = 1;
        this.index= "1-1";
        this.name = '真新镇';
        this.key='round' + (Math.floor((this.id - 1) / 5)+1);
        this.star = 0;
        this.type = 0;
        this.boss = {id:8,level:1,pos:2,rankNum:0};
        this.monsterList = [[{id:7,level:1,pos:1,rankNum:0},{id:7,level:1,pos:2,rankNum:0},{id:9,level:1,pos:3,rankNum:0},{id:9,level:1,pos:4,rankNum:0}],[{id:8,level:1,pos:2,rankNum:0},{id:9,level:1,pos:1,rankNum:0},{id:7,level:1,pos:3,rankNum:0}]];
        this.itemList = [{itemId:12,maxNum:2},{itemId:2,maxNum:3},{itemId:3,maxNum:3},{itemId:4,maxNum:3}];
        this.desc = undefined;
        this.createBoss();
        this.createMonsterList();
        this.createItemList();
    }
}
module.exports = Round1
