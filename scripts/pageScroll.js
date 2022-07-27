const pageScroll = {
    block: () => {
        console.log("block!");
        localStorage.setItem("isScrollLocked", true);
    },
    unblock: () => {
        console.log("unblock!");
        localStorage.setItem("isScrollLocked", false);
    },
    toggleBlock: function () {
        if (this.isBlocked()) {
            this.unblock();
        } else {
            this.block();
        }
    },
    isBlocked: () => {
        console.log("blocked? ", localStorage.getItem("isScrollLocked"));
        return JSON.parse(localStorage.getItem(isScrollLocked));
    },
};

pageScroll.unblock();