<?php require_once './components/header.php'; ?>
<div class="page-content">
        <section id="home" class="page-section header-section" data-in-view="true">
            <canvas id="wave" data-length="0.005" data-amplitude="180" data-frequency="0.01" 
            data-stroke-hue="200" data-stroke-saturation="50" data-stroke-lightness="50"
            data-bg-red="0" data-bg-green="0" data-bg-blue="0" data-bg-alpha="0.01"></canvas>
            <div class="header-title">
                <h1>
                    <span data-direction="vertical" data-ratey="-0.02" data-transition-speed="0.75" data-transition-type="ease">Bon</span> 
                    <span data-direction="vertical" data-ratey="0.04" data-transition-speed="0.75" data-transition-type="ease">gani</span> 
                    <span data-direction="vertical" data-ratey="0.1" data-transition-speed="0.75" data-transition-type="ease">Mko</span>
                    <span data-direction="vertical" data-ratey="-0.1" data-transition-speed="0.75" data-transition-type="ease">nto</span>
                </h1>
            </div>
        </section>
        <section id="about" class="page-section intro-section" data-in-view="true">
            <div class="inner-section-content">
                <div class="section-title">
                    <div class="mugshot"></div>
                </div>
                <article>
                    <p>Welcome to my personal web space. Thank you for taking the time to check out my site.</p>
                    <p>I am a Web Developer by trade, the only child of two hard-working parents, a law abiding citizen
                       but above all I am just a regular person who enjoys spending time and learning to study intriguing discplines in life.</p>
                </article>
            </div>
            <div class="horizontal-line left" data-direction="horizontal" data-ratex="0.2" data-transition-speed="0.5" data-transition-type="linear"></div>
        </section>
        <section id="projects" class="page-section about-section" data-in-view="true">
            <div class="horizontal-line right" data-direction="horizontal" data-ratex="-0.15" data-transition-speed="0.5" data-transition-type="linear"></div>
            <p>This is the about section</p>
        </section>
        <section id="contact" class="page-section portfolio-section" data-in-view="true">
            <p>This is the contact section</p>
        </section>
</div>
<?php require_once './components/footer.php'; ?>