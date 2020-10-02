"use strict";

window.addEventListener('DOMContentLoaded', function(){
    new Content();
    new Canvas();
});
window.addEventListener('scroll', function(){
    new Header('.menu__icon');
    new ElementDataInView('elem-in-view');
    new ParallaxEffect('.page-section.intro-section');
});

