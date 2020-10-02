/**
 * 
 * @param {*} selector 
 * Controls burger menu icon state and animation
 */
const Header = function(selector){

    let icon = document.querySelector(selector);
    const iconClass = 'active-menu'; 

    icon.addEventListener('click', function(){
        let state = this.getAttribute('data-menu-state');
        if(state === 'false'){
            this.setAttribute('data-menu-state', 'true');
            this.classList.add(iconClass);
        }else{
            this.setAttribute('data-menu-state', 'false');
            this.classList.remove(iconClass);
        }
    });

    headerAnimate();
};

function headerAnimate(){

    let headerComponent = document.querySelector('.header__component');
    let headerComponentHeight = headerComponent.getBoundingClientRect().height;

    let winScroll = window.pageYOffset;

    return ( winScroll > headerComponentHeight ) ? headerComponent.classList.add('header-scroll') : headerComponent.classList.remove('header-scroll') ;
}

/**
 * Controls the page content top position when viewport is resized
 */
const Content = function(){
    
    let header = document.querySelector('.header__component');
    let content = document.querySelector('.page-content');
    
    window.addEventListener('resize', function(){
        content.style.top = header.getBoundingClientRect().bottom + 'px';
    });
};

/**
 * 
 * @param {*} selector 
 * Checks if element is in viewport when the screen is scrolling
 */
const ElementDataInView = function(selector){

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