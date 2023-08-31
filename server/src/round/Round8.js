
class Round8 extends RoundBase.CRoundBase {
    constructor() {
        super();
        this.id = 8;
        this.index= "2-3";
        this.name = '神秘部落';
        this.key='round' + (Math.floor((this.id - 1) / 5)+1);
        this.star = 0;
        this.type = 0;
        this.boss = {id:9,level:2,pos:8,rankNum:0};
        this.monsterList = [[{id:7,level:1,pos:1,rankNum:0},{id:7,level:1,pos:2,rankNum:0},{id:9,level:1,pos:3,rankNum:0},{id:9,level:1,pos:4,rankNum:0}],[{id:9,level:1,pos:2,rankNum:0},{id:9,level:1,pos:1,rankNum:0},{id:7,level:1,pos:4,rankNum:0}]];
        this.itemList = [{itemId:10,maxNum:2},{itemId:2,maxNum:3},{itemId:6,maxNum:3},{itemId:3,maxNum:3},{itemId:4,maxNum:3}];
        this.desc = undefined;
        this.createBoss();
        this.createMonsterList();
        this.createItemList();
    }
}
module.exports = Round8
