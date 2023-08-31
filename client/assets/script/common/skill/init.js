window.g_Skill = new class CSkill {

    onSkill(targetPos, skill, sourcePet) {
        //console.log(pid, skill, sourcePet)
        g_AllSkill[skill.type].onSkill(targetPos, sourcePet, skill);
    }
}