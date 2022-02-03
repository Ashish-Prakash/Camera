let videoElement = document.querySelector("video");
let recordButton = document.querySelector("#record");
let recordingstate = false;
let mediaRecord;
(async function(){
    let constraint = {video: true};
    let mediaStream = await navigator.mediaDevices.getUserMedia(constraint);
    videoElement.srcObject = mediaStream;

    mediaRecord = new MediaRecorder(mediaStream);
    mediaRecord.onstart = function(){

    };
    mediaRecord.onstop = function(){

    };
    mediaRecord.ondataavailable = function(){

    };
})();