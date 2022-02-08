let db;
let dbOpenRequest = indexedDB.open("Gallery", 1);
let gallerybtn = document.querySelector(".gallery-btn");
gallerybtn.addEventListener("click", function(){
    window.location.assign("gallery.html");
});
dbOpenRequest.onupgradeneeded = function(e){
    db = e.target.result;
    db.createObjectStore("Media", {keyPath : "mid"});
};
dbOpenRequest.onsuccess = function(e){
    db = e.target.result;
};
dbOpenRequest.onerror = function(e){
    alert("Inside on Error");
};