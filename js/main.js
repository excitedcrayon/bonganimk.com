"use strict";

window.addEventListener('DOMContentLoaded', function(){
    //new Content();
    new Canvas();
    new GetGitProjects();
});
window.addEventListener('scroll', function(){
    new Header('.menu__icon');
    new ElementDataInView('elem-in-view');
    new ParallaxEffect('.header-title h1 span');
    new ParallaxEffect('.page-section .horizontal-line');
    //new ParallaxEffect('.page-section.intro-section');
});

