const accordeon = document.querySelector(".question__wrapper");
const accordeonTitles = accordeon.querySelectorAll(".question__input");

for( let accordeonTitle of accordeonTitles) {    
   accordeonTitle.addEventListener("click", function () {      
       const item = accordeonTitle.parentElement.querySelector(".question__content");
       if ( item.classList.contains("question__content--visible")){    
           item.classList.remove("question__content--visible");
           item.style.maxHeight = null;
       }
       else {
           item.classList.add("question__content--visible");
           item.style.maxHeight =  item.scrollHeight + "px";
       }
   });
}