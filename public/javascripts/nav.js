const menuBars = document.querySelector('.icono-menu-mobile');
const menuMobile = document.querySelector('.menu-mobile');
let items = document.getElementsByClassName('navigation')

menuBars.addEventListener('click', () => {
menuMobile.classList.toggle('oculto');
});

const liMarcas = document.querySelector('.li-marcas');
const menuMarcas = document.querySelector('.menu-marcas');

liMarcas.addEventListener('click', () => {
    menuMarcas.classList.toggle('oculto');
});