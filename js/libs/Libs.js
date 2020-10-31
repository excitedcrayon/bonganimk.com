/**
 * Attributes | constant values 
 */
const Attribs = {
    DEBOUNCER_INTERVAL: 1000,
    winScrollYHeight: 50,
    winScrollOffsetTop: 100,
    contactActive: 'contact-active'
};

/**
 * 
 * @param {*} selector 
 * Controls burger menu icon state and animation
 */
const Header = function(selector){

    let icon = document.querySelector(selector);
    const iconClass = 'active-menu'; 

    if(icon.length > 0){
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
    }

    Header.prototype.headerAnimate();
};
Header.prototype.headerAnimate = function(){
    let headerComponent = document.querySelector('.header__component');
    let headerComponentHeight = headerComponent.getBoundingClientRect().height;

    let winScroll = window.pageYOffset;

    return ( winScroll > headerComponentHeight ) ? headerComponent.classList.add('header-scroll') : headerComponent.classList.remove('header-scroll') ;
};

/**
 * Animate the size of the header component
 */
const HeaderAnimate = function(){
    let headerComponent = document.querySelector('.header__component');
    let headerComponentHeight = headerComponent.getBoundingClientRect().height;

    let winScroll = window.pageYOffset;

    return ( winScroll > headerComponentHeight ) ? headerComponent.classList.add('header-scroll') : headerComponent.classList.remove('header-scroll') ;
};

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
    let scrollPos = Math.ceil(window.pageYOffset + (window.innerHeight * (Attribs.winScrollYHeight/ 100)));
    let debouncer = null;

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

        }, Attribs.DEBOUNCER_INTERVAL);
    }
};

/**
 * Gets JSON data of my Github projects
 */
const GetGitProjects = function(){
    let URL = 'https://api.github.com/users/excitedcrayon/repos?per_page=20';
    fetch(URL)
    .then(function(response){
        response.json().then(function(data){
            GetGitProjects.prototype.renderGitProjects(data);
        });
    })
    .catch(function(error){
        console.log('Fetch error: ' + error);
    });
};
GetGitProjects.prototype.renderGitProjects = function(data){

    let gitProjectsContainer = document.querySelector('.git-projects');

    for ( let i = 0; i < data.length; i++){

        if(data[i]['language'] !== null){

            // div element container
            let projectCard = document.createElement('div');
            projectCard.setAttribute('title', data[i]['description']);
            projectCard.className = 'project-card';
            gitProjectsContainer.appendChild(projectCard);

            // href link to git project
            let link = document.createElement('a');
            link.setAttribute('href', data[i]['html_url']);
            link.setAttribute('target', '_blank');
            link.innerHTML = data[i]['name'];
            projectCard.appendChild(link);

            // span tag that displays the project language
            let tag = document.createElement('span');
            tag.innerHTML = data[i]['language'];
            projectCard.appendChild(tag);
        }
    }
};

/**
 * Scrolls to the section element based on the anchor clicked
 */
const SmoothScrollTo = function(){
    let anchor = document.querySelectorAll('.header__component .header-link');

    for(let a = 0; a < anchor.length; a++){
        let currentAnchor = anchor[a];

        currentAnchor.addEventListener('click', function(){
            if(this.id !== ''){
                SmoothScrollTo.prototype.scrollTo(document.querySelector('.page-content #'+this.id));
            }else{
                SmoothScrollTo.prototype.scrollToTop();
            }
        });
    }
}
SmoothScrollTo.prototype.scrollTo = function(element){
    setTimeout(function(){
        
        window.scroll({
            behavior: 'smooth',
            left: 0,
            top: element.offsetTop - Attribs.winScrollOffsetTop
        });

    }, Attribs.DEBOUNCER_INTERVAL / 2);
}
SmoothScrollTo.prototype.scrollToTop = function(){
    setTimeout(function(){

        window.scroll({
            behavior: 'smooth',
            left: 0,
            top: 0
        });

    }, Attribs.DEBOUNCER_INTERVAL / 2);
}

/**
 * Submits contact form and handles form validation
 */
const SubmitContactForm = function(){
    let contactButton = document.querySelector('.contact-button #contactButton');
    contactButton.addEventListener('click', function(){
        document.body.classList.toggle(Attribs.contactActive);
    });

    let closeFormButton = document.querySelector('.close-form-button button');
    closeFormButton.addEventListener('click', function(){
        document.body.classList.remove(Attribs.contactActive);
    });

    let contactForm = document.querySelector('#contactForm');
    let contactName = document.querySelector('#contactForm #contactName');
    let contactMessage = document.querySelector('#contactForm #contactName');
    
    let submitFormButton = document.querySelector('#contactForm #submit');
    submitFormButton.addEventListener('click', function(event){

        if(contactName.value === '' && contactMessage.value === ''){
            contactForm.classList.add('error');
            event.preventDefault();
        }else{
            SubmitContactForm.prototype.getFormData(contactName, contactMessage);
        }
    });
};
SubmitContactForm.prototype.getFormData = function(name, message){
    let data = "name="+name+"&message="+message;
    let URL = location.origin + '/components/send-email.php';

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            console.log(response);
            location.href = location.origin;
        }
        xhr.open('POST', URL, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(data);

    };
};