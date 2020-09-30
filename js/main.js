['DOMContentLoaded','scroll'].forEach(function(event){
    window.addEventListener(event, function(){
        new ElementDataInView('elem-in-view');
        new ParallaxEffect('.page-section.intro-section');
    });
});

