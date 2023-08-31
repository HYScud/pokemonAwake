window.commonClick = {
    popupShow: (node) => {
        console.log("dianji")
        node.active = true;
        Audio_M.play("popupOpen", false, "popup");
    },
    popupClose: (node) => {
        node.active = false;
        Audio_M.play("popupClose", false, "popup");
    }
}