function humClick(){
    let x = document.querySelector(".menu__humburger");
    let menu = document.querySelector(".menu__mobil")
    x.classList.toggle("change");
    if(menu.style.display==="block"){
        menu.style.display="none";
    }
    else{
        menu.style.display="block";
    }
}

function navIconClick(){
    let x = document.getElementById("navLinks");
    let navbar = document.querySelector(".header__navbar");
    if(x.style.display==="block"){
        x.style.display="none";
    }
    else{
        x.style.display="block";
    }
}