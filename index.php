<?php require_once './components/header.php'; ?>
<div class="page-content">
        <section class="page-section header-section" data-in-view="true">
            <canvas id="wave" data-length="0.005" data-amplitude="180" data-frequency="0.01" 
            data-stroke-hue="200" data-stroke-saturation="50" data-stroke-lightness="50"
            data-bg-red="0" data-bg-green="0" data-bg-blue="0" data-bg-alpha="0.01"></canvas>
        </section>
        <section class="page-section intro-section" data-in-view="true" data-direction="vertical" data-ratey="-0.2" data-transition-speed="0.7" data-transition-type="ease"></section>
        <section class="page-section about-section" data-in-view="true"></section>
        <section class="page-section portfolio-section" data-in-view="true"></section>
    </div>
<?php require_once './components/footer.php'; ?>