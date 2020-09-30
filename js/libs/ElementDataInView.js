var ElementDataInView = function(selector){

    let elem = document.querySelectorAll("[data-in-view]");
    let scrollPos = Math.ceil(window.pageYOffset + (window.innerHeight * (40/ 100)));
    let debouncer = null;
    const DEBOUNCER_INTERVAL = 1000;

    if(!debouncer){
        debouncer = setTimeout(function(){
            debouncer = null;

            for(let i = 0; i < elem.length; i++){
                let bounds = elem[i].getBoundingClientRect();
                let elemTop = bounds.top;
                if(scrollPos >= elemTop){
                    elem[i].classList.add(selector);
                }else{
                    elem[i].classList.remove(selector);
                }
            }

        }, DEBOUNCER_INTERVAL);
    }
};