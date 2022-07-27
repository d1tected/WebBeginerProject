const hamburgerMenuOpen = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.fullscreen-menu');
hamburgerMenuOpen.addEventListener('click', OpenMenu => {
    OpenMenu.preventDefault();
    document.getElementsByClassName('fullscreen-menu')[0].style.display = "block";
    document.body.classList.add('locked');

});


const hamburgerMenuClose = document.querySelector('.fullscreen-menu__close');
hamburgerMenuClose.addEventListener('click', CloseMenu => {
    CloseMenu.preventDefault();
    document.getElementsByClassName('fullscreen-menu')[0].style.display = "none";
    document.body.classList.remove('locked');
});

mobileMenu.addEventListener('click', e => {
    e.preventDefault();

    if (e.target.classList.contains('menu__link')) {
        document.getElementsByClassName('fullscreen-menu')[0].style.display = "none";
        document.body.classList.remove('locked');
    }
})