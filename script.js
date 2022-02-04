let videoElement = document.querySelector("video");
let recordButton = document.querySelector("#record");
let captureImage = document.querySelector("#capture");
let recordingState = false; 
let mediaRecorder;
(async function(){
    let constraint = {video: true};
    let mediaStream = await navigator.mediaDevices.getUserMedia(constraint);
    videoElement.srcObject = mediaStream;

    mediaRecorder = new MediaRecorder(mediaStream);
    console.log(mediaRecorder);
    mediaRecorder.onstart = function(){
        console.log("Inside on");
    };
    mediaRecorder.ondataavailable = function(e){
        console.log("Inside on data avilable");
        console.log(e.data);
        let videoObject = new Blob([e.data],{ type: "video/mp4" });
        let videoUrl = URL.createObjectURL(videoObject);
        let aTag = document.createElement("a");
        aTag.download = `Video${Date.now()}.mp4`;
        aTag.href = videoUrl;
        aTag.click();
    };
    mediaRecorder.onstop = function(){
        console.log("Inside stop");
    };
    recordButton.addEventListener("click", function(){
        if(recordingState){
            mediaRecorder.stop();
            recordButton.innerHTML = "Record Video";
            recordingState = false;
        }
        else{
            mediaRecorder.start();
            recordButton.innerHTML = "Recording..";
            recordingState = true;
        }
    });
    captureImage.addEventListener("click", function(){
        let canvas = document.querySelector("canvas");
        canvas.width = 640;
        canvas.height = 480;
        let ctx = canvas.getContext("2d");
        ctx.drawImage(videoElement,0,0);
        let aTag = document.createElement("a");
        aTag.download = `Photo${Date.now()}.jpg`;
        aTag.href = canvas.toDataURL("image/jpg");
        aTag.click();
    });
})();