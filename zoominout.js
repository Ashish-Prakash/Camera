let zoomin = document.querySelector(".zoomIn");
let zoomout = document.querySelector(".zoomOut");

let scale = 1;
let minzoom = 1;
let maxzoom = 3.1;

zoomin.addEventListener("click", function(){
    if(scale + 0.1 > maxzoom){
        return;
    }
    scale = scale + 0.1;
    console.log(scale);
    videoElement.style.transform = `scale(${scale})`;
});
zoomout.addEventListener("click", function(){
    if(scale - 0.1 < minzoom){
        return;
    }
    scale = scale - 0.1;
    console.log(scale);
    videoElement.style.transform = `scale(${scale})`;
});