let videoElement = document.querySelector("video");
let recordButton = document.querySelector(".inner-record");
let capturePhoto = document.querySelector(".inner-capture");
let recordingState = false;
let mediaRecorder;
let audio = new Audio("capturesound.mp3");
let vaudio = new Audio("videorecord.mp3");

(async function () {
  let constraint = { video: true };
  let mediaStream = await navigator.mediaDevices.getUserMedia(constraint);
  videoElement.srcObject = mediaStream;
  mediaRecorder = new MediaRecorder(mediaStream);
  mediaRecorder.onstart = function () {
    console.log("Inside on start");
  };
  mediaRecorder.ondataavailable = function (e) {
    console.log("Inside on data available");
    console.log(e.data);
    let videoObject = new Blob([e.data], { type: "video/mp4" });
    // let videoURL = URL.createObjectURL(videoObject);
    // let aTag = document.createElement("a");
    // aTag.download = `Video${Date.now()}.mp4`;
    // aTag.href = videoURL;
    // aTag.click();
    addMedia(videoObject, "video");
  };
  mediaRecorder.onstop = function () {
    console.log("Inside on stop");
  };
  recordButton.addEventListener("click", recordMediaFun);
  capturePhoto.addEventListener("click", capturePhotoFun);
})();
function capturePhotoFun() {
  capturePhoto.classList.add("animate-capture");
  
  setTimeout( function(){
      capturePhoto.classList.remove("animate-capture");
  } , 1000  );
  let canvas = document.createElement("canvas");
  canvas.width = 640; 
  canvas.height = 480;     
  let ctx = canvas.getContext("2d");
  if(currentscale != 1){
    ctx.translate(canvas.width/2, canvas.height/2);
    ctx.scale(currentscale, currentscale);
    ctx.translate(-canvas.width/2, -canvas.height/2); 
  }
  ctx.drawImage(videoElement, 0, 0);
  if(selectedfilter != "none"){
    ctx.fillStyle = selectedfilter;
    ctx.fillRect(0,0,canvas.width, canvas.height);
  }
  // let aTag = document.createElement("a");
  // aTag.download = `Image${Date.now()}.jpg`;
  // aTag.href = canvas.toDataURL("image/jpg");
  // aTag.click();
  let canvasUrl = canvas.toDataURL("image.jpg");
  addMedia(canvasUrl, "photo");
  audio.play();
}
function recordMediaFun() {
  if (recordingState) {
    mediaRecorder.stop();
    recordingState = false;
    recordButton.classList.remove("animate-record");
  } else {
    mediaRecorder.start();
    recordingState = true;
    recordButton.classList.add("animate-record");      
  }
  vaudio.play();
}
function addMedia(mediaUrl, mediaType){
  let tnxObject = db.transaction("Media", "readwrite");
  let MediaTable = tnxObject.objectStore("Media");
  MediaTable.add({mid: Date.now(), type: mediaType, url: mediaUrl});
  tnxObject.onerror = function(e){
    console.log("tnx failed");
    console.log(e);
  }
}