let zoomin = document.querySelector(".zoomIn");
let zoomout = document.querySelector(".zoomOut");

let currentscale = 1;
let minzoom = 1;
let maxzoom = 3.1;

zoomin.addEventListener("click", function(){
    if(currentscale + 0.1 > maxzoom){
        return;
    }
    currentscale = currentscale + 0.1;
    console.log(currentscale);
    videoElement.style.transform = `scale(${currentscale})`;
});
zoomout.addEventListener("click", function(){
    if(currentscale - 0.1 < minzoom){
        return;
    }
    currentscale = currentscale - 0.1;
    console.log(currentscale);
    videoElement.style.transform = `scale(${currentscale})`;
});