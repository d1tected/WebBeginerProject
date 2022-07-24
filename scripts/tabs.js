const FindBlockByAlias = alias => {
    return $(".reviews__item").filter((ndx, item) => {
        return $(item).attr("data-linked-with") == alias
    })
};

$(".interective-avatar-link").click(e => { 
    e.preventDefault();
    
    const $this = $(e.currentTarget);
    const target = $this.attr("data-open")
    const itemToShow = FindBlockByAlias(target);
    const curItem = $this.closest(".interective-avatar");

    itemToShow.addClass("active").siblings().removeClass("active");
    curItem.addClass("interective-avatar--active").siblings().removeClass("interective-avatar--active");
});