"use strict";

window.addEventListener('DOMContentLoaded', function(){
    new Canvas();
    new GetGitProjects();
    new SmoothScrollTo();
    new SubmitContactForm();
});
window.addEventListener('scroll', function(){
    new HeaderAnimate();
    new ElementDataInView('elem-in-view');
    new ParallaxEffect('.header-title h1 span');
    new ParallaxEffect('.page-section .vertical-line');
    new ParallaxEffect('.page-section .horizontal-line');
});

