const canvas = document.querySelector('#wave');
const headerSection = document.querySelector('.page-section.header-section');
const ctx = canvas.getContext('2d');

canvas.width = headerSection.getBoundingClientRect().width;
canvas.height = headerSection.getBoundingClientRect().height;

const wave = {
    y: canvas.height / 2,
    length: parseFloat(canvas.getAttribute('data-length')),
    amplitude: parseFloat(canvas.getAttribute('data-amplitude')),
    frequency: parseFloat(canvas.getAttribute('data-frequency'))
};

const strokeColor = {
    h: parseInt(canvas.getAttribute('data-stroke-hue')),
    s: parseInt(canvas.getAttribute('data-stroke-saturation')),
    l: parseInt(canvas.getAttribute('data-stroke-lightness'))
};

const backgroundColor = {
    r: parseFloat(canvas.getAttribute('data-bg-red')),
    g: parseFloat(canvas.getAttribute('data-bg-green')),
    b: parseFloat(canvas.getAttribute('data-bg-blue')),
    a: parseFloat(canvas.getAttribute('data-bg-alpha'))
};

let increment = wave.frequency;

const Canvas = function(){
    resizeCanvas();
    animateCanvas();
}

function resizeCanvas(){
    window.addEventListener('resize', function(){
        canvas.width = headerSection.getBoundingClientRect().width;
        canvas.height = headerSection.getBoundingClientRect().height;
    });
}

function animateCanvas(){

    requestAnimationFrame(animateCanvas);
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.01)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.moveTo(0, wave.y);

    for(let i = 0; i < canvas.width; i++){
        ctx.lineTo(i, wave.y + Math.sin(i * wave.length + increment) * wave.amplitude * Math.sin(increment));
    }

    ctx.strokeStyle = `hsl(${strokeColor.h * Math.sin(increment)}, ${strokeColor.s}%, ${strokeColor.l}%)`;
    ctx.stroke();

    increment += wave.frequency;
}