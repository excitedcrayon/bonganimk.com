/**
 * Attributes | constant values 
 */
const Attribs = {
    DEBOUNCER_INTERVAL: 1000,
    winScrollYHeight: 50,
    winScrollOffsetTop: 100,
    contactActiveSelector: 'contact-active',
    messageSentSelector: 'message-sent',
    numOfLoadingBars: 6
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
        document.body.classList.toggle(Attribs.contactActiveSelector);
    });

    let closeFormButton = document.querySelector('.close-form-button button');
    closeFormButton.addEventListener('click', function(){
        document.body.classList.remove(Attribs.contactActiveSelector);
        setTimeout(function(){
            new ReloadPage();
        }, Attribs.DEBOUNCER_INTERVAL / 1.5);
    });

    let contactForm = document.querySelector('#contactForm');
    let contactName = document.querySelector('#contactForm #contactName');
    let contactEmail = document.querySelector('#contactForm #contactEmail');
    let contactMessage = document.querySelector('#contactForm #contactMessage');
    
    let submitFormButton = document.querySelector('#contactForm #submit');
    submitFormButton.addEventListener('click', function(event){

        if(contactName.value === '' || contactEmail.value === '' || contactMessage.value === ''){
            contactForm.classList.add('error');
            event.preventDefault();
        }else{
            SubmitContactForm.prototype.getFormData(contactName.value, contactEmail.value ,contactMessage.value);
            event.preventDefault();
        }
    });
};
SubmitContactForm.prototype.getFormData = function(name, email, message){

    let URL = location.origin + '/bonganimk.com/components/send-email.php';
    let data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("message", message);

    fetch(URL, {
        method: 'POST',
        body: data,
        mode: 'no-cors',
        headers: new Headers({'Content-Type':'application/json'})
    }).then((response) => {

        new LoadingScreen();
        setTimeout(() => {
            if(response.status === 200){
                document.body.classList.add(Attribs.messageSentSelector);
                new CloseLoadingScreen();
            }
        }, Attribs.DEBOUNCER_INTERVAL * 2);

    }).catch((error) => {
        console.log('Fetch error: ' + error);
    });

};

/**
 * Creates and loads the overlay screen when the Fetch API is initiated
 */
const LoadingScreen = function(){

    let overlay = document.createElement('div');
    overlay.className = 'overlay';

    let loadingBars = document.createElement('div');
    loadingBars.className = 'loading-bars';

    let notification = document.querySelector('p');
    notification.className = 'notification';
    notification.innerHTML = '<img src="./res/img/green-tick.svg">Your message has been sent';

    overlay.appendChild(loadingBars);
    overlay.appendChild(notification);

    for(let i = 0; i < Attribs.numOfLoadingBars; i++){
        let bars = document.createElement('div');
        loadingBars.appendChild(bars);
    }

    document.body.appendChild(overlay);
};

/**
 * Closed the overlay screen
 */
const CloseLoadingScreen = function(){
    setTimeout(function(){
        new ReloadPage();
    }, Attribs.DEBOUNCER_INTERVAL * 4);
};

/**
 * Reloads the web page
 */
const ReloadPage = function(){
    location = location.href;
};