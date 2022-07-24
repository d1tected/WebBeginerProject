const hamburgerMenuOpen = document.querySelector('.hamburger');
hamburgerMenuOpen.addEventListener('click', OpenMenu => {
    OpenMenu.preventDefault();
    document.getElementsByClassName('fullscreen-menu')[0].style.display = "block";
});


const hamburgerMenuClose = document.querySelector('.fullscreen-menu__close');
hamburgerMenuClose.addEventListener('click', CloseMenu => {
    CloseMenu.preventDefault();
    document.getElementsByClassName('fullscreen-menu')[0].style.display = "none";
});