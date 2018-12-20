document.addEventListener("DOMContentLoaded", function(event) {
    // Your code to run since DOM is loaded and ready
    setTimeout(function(){

        setVideoURL("/mpat/web/app/uploads/2018/12/rbb_quiz_video.mp4");
        createTimerVideoTemplate();
        createTimerVideo();
        createToggleTrackingButtonTemplate("530px", " A");
        createToggleTrackingButtonTemplate("580px", " B");
        createToggleTrackingButtonTemplate("630px", " C");
        createScoreTemplate();
    
    }, 2600);

});


// Global Variables 
var seconds = 0, minutes = 0, hours = 0, t = 0;

function setVideoURL (videoUrl) {
    var vidObject = document.getElementsByClassName("video-wrapper")[0].firstChild;
    vidObject.data = videoUrl;
}

function createScoreTemplate() {
    var mainContainer = document.getElementsByClassName("page-elements-container")[0];
    var mainDiv = document.createElement("div");
    mainDiv.classList.add("page-element");
    mainDiv.classList.add("text-content");
    mainDiv.style.left = "1040px" 
    mainDiv.style.top = "40px";
    mainDiv.style.width = "100px";
    mainDiv.style.height = "40px";
    mainDiv.style.zIndex = "1000";

    var child1Div = document.createElement("div");
    child1Div.style.left = "0px";
    child1Div.style.top = "0px";
    child1Div.style.width = "0px";
    child1Div.style.height = "0px";
    child1Div.style.position = "absolute";

    var child2Div = document.createElement("div");
    child2Div.classList.add("page-element-content");
    child2Div.classList.add("text-content");

    var child3Div = document.createElement("div");
    child3Div.classList.add("not-scrolling");

    var child4p = document.createElement("p");
    child4p.innerText = "Score 0/16";

    child3Div.appendChild(child4p);
    child2Div.appendChild(child3Div);
    child1Div.appendChild(child2Div);
    mainDiv.appendChild(child1Div);
    mainContainer.appendChild(mainDiv);
}


function createToggleTrackingButtonTemplate(top, text) {
    var mainContainer = document.getElementsByClassName("page-elements-container")[0];
    var mainDiv = document.createElement("div");
    mainDiv.classList.add("page-element");
    mainDiv.classList.add("toggletracking-component");
    mainDiv.style.left = "1160px" 
    mainDiv.style.top = top;
    mainDiv.style.width = "60px";
    mainDiv.style.height = "40px";
    mainDiv.style.zIndex = "1000";
    mainDiv.style.border = "solid";
    mainDiv.style.borderColor = "red";
    mainDiv.style.display = "none";

    var child1Div = document.createElement("div");
    child1Div.style.left = "0px";
    child1Div.style.top = "0px";
    child1Div.style.width = "0px";
    child1Div.style.height = "0px";
    child1Div.style.position = "absolute";

    var child2Div = document.createElement("div");
    child2Div.classList.add("page-element-content");
    child2Div.classList.add("toggle-tracking-content");

    // var child3Ul = document.createElement("ul");
    // child3Ul.classList.add("menu-component");
    // child3Ul.classList.add("horizontal-menu-component");

    // var child4Li = document.createElement("li");
    // child4Li.classList.add("menu-item");
    // child4Li.style.border = "solid";
    // child4Li.style.borderColor = "yellow";

    var child5Span = document.createElement("span");
    child5Span.innerText = text;

    // child4Li.appendChild(child5Span);
    // child3Ul.appendChild(child4Li);
    child2Div.appendChild(child5Span);
    child1Div.appendChild(child2Div);
    mainDiv.appendChild(child1Div);
    mainContainer.appendChild(mainDiv);
}

function createTimerTemplate() {
    var timerElement = document.createElement("p");
    timerElement.id = "timer";
    timerElement.style.position = "relative";
    timerElement.style.zIndex = "1000";
    timerElement.style.color = "white";
    var timerDiv = document.createElement("div");
    timerDiv.appendChild(timerElement);
    
    var mainContainer = document.getElementsByClassName("page-elements-container")[0];
    mainContainer.appendChild(timerDiv); 
}

function createTimerVideo() {
    function add() {
        seconds++;
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
            if (minutes >= 60) {
                minutes = 0;
                hours++;
            }
        }
        document.getElementById("videoTimer").textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
        document.getElementById("videoTimer").style.color = "white";
        timer();
    }

    function timer() {
        t = setTimeout(add, 1000);
        compareStartTime();
        compareEndTime();
    }
    timer();
}

function createTimerVideoTemplate() {
    var mainContainer = document.getElementsByClassName("page-elements-container")[0];
    var mainDiv = document.createElement("div");
    mainDiv.classList.add("page-element");
    mainDiv.classList.add("text-content");
    mainDiv.style.left = "1040px" 
    mainDiv.style.top = "130px";
    mainDiv.style.width = "100px";
    mainDiv.style.height = "40px";
    mainDiv.style.zIndex = "1000";

    var child1Div = document.createElement("div");
    child1Div.style.left = "0px";
    child1Div.style.top = "0px";
    child1Div.style.width = "0px";
    child1Div.style.height = "0px";
    child1Div.style.position = "absolute";

    var child2Div = document.createElement("div");
    child2Div.classList.add("page-element-content");
    child2Div.classList.add("text-content");

    var child3Div = document.createElement("div");
    child3Div.classList.add("not-scrolling");

    var child4h = document.createElement("h2");
    child4h.id = "videoTimer";

    var child5Time = document.createElement("time");
    child5Time.innerText = "00:00:00";
    child5Time.style.color = "white";
    
    child4h.appendChild(child5Time);
    child3Div.appendChild(child4h);
    child2Div.appendChild(child3Div);
    child1Div.appendChild(child2Div);
    mainDiv.appendChild(child1Div);
    mainContainer.appendChild(mainDiv);
}

function createTimer() {
    // Set the date we're counting down to
    var countDownDate = new Date("Dec 13, 2018 13:30:00").getTime();

    // Update the count down every 1 second
    var x = setInterval(function() {
        // Get todays date and time
        var now = new Date().getTime();
        var distance = countDownDate - now;
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        document.getElementById("timer").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
        compareStartTime();
        compareEndTime();
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("timer").innerHTML = "EXPIRED";
        }
    }, 1000);
}

function createVideoTemplate(version) {
    var background = document.getElementById("vidcontainer");
    var videoElement = null;
    if (version == "html5") {
        videoElement = document.createElement("video");
        videoElement.src = "/mpat/web/app/uploads/2018/12/SampleVideo_1280x720_5mb.mp4";
        console.log("It's working on HTML5!!");
    } else {
        videoElement = document.createElement("object");
        videoElement.type = "video/mp4";
        videoElement.data = "/mpat/web/app/uploads/2018/12/SampleVideo_1280x720_5mb.mp4";
        videoElement.ontimeupdate = function() {
            document.getElementById("current").innerText = videoElement.currentTime;
        };
        console.log("It's working on HTML4!!");
    }
    videoElement.id = "video";
    videoElement.autoplay = true;
    videoElement.style.minHeight = "100%";
    videoElement.style.minWidth = "100%";
    background.appendChild(videoElement);
}

function compareStartTime() {
    var startTimeCol = passedObject.start_time_col;
    for(var i = 0; i < startTimeCol.length; i++) {
        if (startTimeCol[i] == seconds) {
            document.getElementsByClassName("toggletracking-component")[0].style.display = "block";
            document.getElementsByClassName("toggletracking-component")[1].style.display = "block";
            document.getElementsByClassName("toggletracking-component")[2].style.display = "block";
        }
    }
}

function compareEndTime() {
    var endTimeCol = passedObject.end_time_col;
    for(var i = 0; i < endTimeCol.length; i++) {
        if (endTimeCol[i] == seconds) {
            document.getElementsByClassName("toggletracking-component")[0].style.display = "none";
            document.getElementsByClassName("toggletracking-component")[1].style.display = "none";
            document.getElementsByClassName("toggletracking-component")[2].style.display = "none";
        }
    }
}

