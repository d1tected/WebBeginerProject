const sections = $("section");
const display = $(".maincontainer");
const isLockedBody = document.body.classList;



const mobileDetect = new MobileDetect(window.navigator.userAgent);
isMobile = mobileDetect.mobile();
console.log(isMobile);

let inScroll = false;

sections.first().addClass("active");

const performTransition = sectionEq => {

    if(document.body.classList.contains('locked')) return;

    // if (pageScroll.isBlocked()) {
    //     return;
    // }

    if (inScroll === false) {
        inScroll = true;
        const position = sectionEq * -100;

        const currentSection = sections.eq(sectionEq);
        const menuTheme = currentSection.attr("data-sidemenu-theme");
        const sidemenu = $(".fixed-menu__link");
        const sidemenuActive = $(".fixed-menu");

        if (menuTheme === "white") {
            sidemenu.addClass("fixed-menu__link--lighted");
        } else {
            sidemenu.removeClass("fixed-menu__link--lighted");
        }

        display.css({
            transform: `translateY(${position}%)`
        });

        sections.eq(sectionEq).addClass("active").siblings().removeClass("active");
        
        setTimeout(() => {
            inScroll = false;

            sidemenuActive
            .find(".fixed-menu__item")
            .eq(sectionEq)
            .addClass("fixed-menu__item--active")
            .siblings()
            .removeClass("fixed-menu__item--active");
        }, 1300)

        
    }
}

const scrollViewport = direction => {
    const activeSection = sections.filter(".active");
    const nextSections = activeSection.next();
    const prevSections = activeSection.prev();

    if (direction === "next" && nextSections.length) {
        performTransition(nextSections.index())
    }

    if (direction === "prev" && prevSections.length) {
        performTransition(prevSections.index())
    }
}

$(window).on("wheel", e => { 
    const deltaY = e.originalEvent.deltaY;

    if (deltaY > 0) {
        scrollViewport("next");
    }
    if (deltaY < 0) {
        scrollViewport("prev");
    }   
});

$(window).on("keydown", e => {
    const tagName = e.target.tagName.toLowerCase();

    if (tagName != "input" && tagName != "textarea") {
        switch (e.keyCode) {
            case 38:
                scrollViewport("prev");
                break;
            
            case 40:
                scrollViewport("next");
                break;
        }
    }  
})

$("wrapper").on("touchmove", e => {
    preventDefault();
})

$("[data-scroll-to]").click(e => {
    e.preventDefault();

    const $this = $(e.currentTarget);
    const target = $this.attr("data-scroll-to");
    const reqSection = $(`[data-section-id=${target}]`);

    // console.log(reqSection.index());
    document.body.classList.remove('locked');
    performTransition(reqSection.index());
})



if (isMobile ) {
    //https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
    $("body").swipe( {
        swipe:function(event, direction) {
            if (direction === "up") {
                scrollViewport("next");
            }

            if (direction === "down")
                scrollViewport("prev"); 
      },
    });
}

