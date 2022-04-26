
function menuClick(){
    menuBtn.classList.toggle('active');
    menu.classList.toggle('active');
}
let menuBtn = document.querySelector('.menu__btn');
let menu = document.querySelector('.menu');
let menuA =document.querySelectorAll('.menu__item'); 
for (let elem of menuA){
    elem.addEventListener('click', menuClick)
}

menuBtn.addEventListener('click', menuClick);