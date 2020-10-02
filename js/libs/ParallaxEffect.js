/**
 * ======================= PARALLAX EFFECT FUNCTIONS  =======================
 */

var ParallaxEffect = function (selector) {
    var element = document.querySelectorAll(selector);
    if (element) {
        this.elemSelector = element;
    }
    this.winScroll = window.pageYOffset;
    this.init();
};
ParallaxEffect.prototype.init = function () {
    if (this.elemSelector) {
        for (let i = 0; i < this.elemSelector.length; i++) {
            let currentElement = this.elemSelector[i];

            let elemRateX = this.elemAttribute(currentElement, 'data-rateX');
            let elemRateY = this.elemAttribute(currentElement, 'data-rateY');
            let elemDirection = this.elemAttribute(currentElement, 'data-direction');
            let transitionSpeed = this.elemAttribute(currentElement, 'data-transition-speed');
            let transitionType = this.elemAttribute(currentElement, 'data-transition-type');

            let rateX = this.winScroll * elemRateX;
            let rateY = this.winScroll * elemRateY;

            let isElementInView = this.checkViewport(currentElement);
            if (isElementInView) {
                this.applyParallax(currentElement, elemDirection, rateX, rateY, transitionSpeed, transitionType);
            }else{
                this.applyParallax(currentElement, elemDirection, 0, 0, transitionSpeed, transitionType);
            }
        }
    }
};
ParallaxEffect.prototype.elemAttribute = function (element, attribute) {
    return (element.getAttribute(attribute) !== null) ? element.getAttribute(attribute) : "0" ;
};
ParallaxEffect.prototype.checkViewport = function (element) {
    let bounds = element.getBoundingClientRect();
    let elemTop = bounds.top;
    let elemBottom = bounds.bottom;

    let pageTop = elemTop + (window.innerHeight * (50 / 100));
    if ((pageTop >= 0) && (elemBottom <= window.innerHeight)) {
        return true;
    }
};
ParallaxEffect.prototype.applyParallax = function (nodeElement, direction, rateX, rateY, transitionSpeed, transitionType) {
    if (direction === 'vertical') {
        nodeElement.style.setProperty('-webkit-transform', 'translate3d('+rateX+'px,'+rateY+'px,0)');
        nodeElement.style.setProperty('-ms-transform', 'translate3d('+rateX+'px,'+rateY+'px,0)');
        nodeElement.style.setProperty('-moz-transform', 'translate3d('+rateX+'px,'+rateY+'px,0)');
        nodeElement.style.setProperty('transform', 'translate3d('+rateX+'px,'+rateY+'px,0)');
        nodeElement.style.setProperty('-webkit-transition','all '+transitionSpeed+'s '+transitionType);
        nodeElement.style.setProperty('transition','all '+transitionSpeed+'s '+transitionType);
    }

    if (direction === 'horizontal') {
        nodeElement.style.setProperty('-webkit-transform', 'translate3d('+rateX+'px,'+rateY+'px,0)');
        nodeElement.style.setProperty('-ms-transform', 'translate3d('+rateX+'px,'+rateY+'px,0)');
        nodeElement.style.setProperty('-moz-transform', 'translate3d('+rateX+'px,'+rateY+'px,0)');
        nodeElement.style.setProperty('transform', 'translate3d('+rateX+'px,'+rateY+'px,0)');
        nodeElement.style.setProperty('-webkit-transition','all '+transitionSpeed+'s '+transitionType);
        nodeElement.style.setProperty('transition','all '+transitionSpeed+'s '+transitionType);
    }
};