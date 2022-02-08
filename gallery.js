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
            <i class="fas fa-download"></i>
          </div>
          <div class="delete-media">
            <i class="fas fa-trash"></i>
          </div>
      </div>`;
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
  
  function appendVideo(mediaObj) {
    let mediaDiv = document.createElement("div");
    mediaDiv.classList.add("media-div");
    mediaDiv.innerHTML = `<video class="media-video" controls autoplay loop></video>
      <div class="media-buttons">
          <div class="download-media">Download</div>
          <div class="delete-media">Delete</div>
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