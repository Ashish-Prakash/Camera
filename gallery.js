let backbtn = document.querySelector(".back-to-idx");

let db ;
let openDB = indexedDB.open("Gallery", 1);
openDB.onupgradeneeded = function(){
    db = e.target.result;
    db.createObjectStore("Media", {keyPath : "mid"});
};
openDB.onsuccess = function(e){
    db = e.target.result;
    console.log("Inside on success");
    fetchMedia();
};
openDB.onerror = function(e){
    alert("Error");
}

backbtn.addEventListener("click", function(){
    window.location.assign("index.html");
});

function fetchMedia(){
    let request = db.transaction("Media", "readwrite");
    let mediaTable = request.objectStore("Media");
    let cursorObject = mediaTable.openCursor();
    cursorObject.onsuccess = function(e){
        let cursor = cursorObject.result;
        if(cursor){
            let mediaObj = cursor.value;
            if(mediaObj.type == "photo"){
                appendPhoto(mediaObj);
            }
            else{
                appendVideo(mediaObj);
            }
            cursor.continue();
        }
    };   
}

function appendPhoto(mediaObj) {
    let mediaDiv = document.createElement("div");
    mediaDiv.classList.add("media-div");
    mediaDiv.innerHTML = `<img class="media-img" src=${mediaObj.url} alt="">
        <div class="media-buttons">
            <div class="download-media">
            <i id ="dwl" class="fas fa-download"></i>
            </div>
            <div class="delete-media">
            <i id ="del" class="fas fa-trash"></i>
            </div>
        </div>`;
    mediaDiv.querySelector("#dwl").addEventListener("click", function () {
        downloadMedia(mediaObj);
        });
    mediaDiv.querySelector("#del").addEventListener("click", function () {
        deleteMedia(mediaObj, mediaDiv);
        });

    document.querySelector(".gallery").append(mediaDiv);
}
function appendVideo(mediaObj) {
    let mediaDiv = document.createElement("div");
    mediaDiv.classList.add("media-div");
    mediaDiv.innerHTML = `<video class="media-video" controls autoplay loop></video>
        <div class="media-buttons">
            <div class="download-media">
            <i id ="dwl" class="fas fa-download"></i>
            </div>
            <div class="delete-media">
            <i id ="del" class="fas fa-trash"></i>
            </div>
        </div>`;
    mediaDiv.querySelector("video").src = URL.createObjectURL(mediaObj.url);
    mediaDiv
        .querySelector(".download-media")
        .addEventListener("click", function () {
        downloadMedia(mediaObj);
        });
    mediaDiv
        .querySelector(".delete-media")
        .addEventListener("click", function () {
        deleteMedia(mediaObj, mediaDiv);
        });
    document.querySelector(".gallery").append(mediaDiv);
}

function downloadMedia(mediaObj){
    let aTag = document.createElement("a");
    if(mediaObj.type == "photo"){
        aTag.download = `${mediaObj.mid}.jpg`
        aTag.href = mediaObj.url;
    }
    else{
        aTag.download = `${mediaObj.mid}.mp4`;
        aTag.href = URL.createObjectURL(mediaObj.url);
    }
    aTag.click();
}
function deleteMedia(mediaObj, mediaDiv){
    let mid = mediaObj.mid;
    let txnObject = db.transaction("Media", "readwrite");
    let mediaTable = txnObject.objectStore("Media");
    mediaTable.delete(mid);
    mediaDiv.remove();
}