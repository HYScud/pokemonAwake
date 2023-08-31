class CSpineManager {
    playSpine(node, anim, loop, func, endFunc, InterruptFunc) {
        let sk = node.getComponentInChildren(sp.Skeleton);
        if (sk) {
            sk.defaultAnimation = anim;
            sk.setAnimation(0, anim, loop);
            sk.setEventListener((a, b) => {
                if (func) func();
            });
            sk.setCompleteListener((a, b) => {
                if (endFunc) endFunc();
            })
            sk.setInterruptListener((a, b) => {
                if (InterruptFunc) InterruptFunc();
            })
        }
    }
}
window.Spine_M = new CSpineManager()