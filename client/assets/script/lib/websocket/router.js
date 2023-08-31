class CSlot extends cc.EventTarget {

}
window.Router = new CSlot();
window.BattleEvent = {
    selected: "selected",
    AtkOver: "AtkOver",
    FinalSkill: "FinalSkill",
}
window.ChangeEvent = {
    res: "res",
    useItem: "useItem",
    PetPos: "petPos",
}