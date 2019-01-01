document.addEventListener("DOMContentLoaded", function(event) {
    // Your code to run since DOM is loaded and ready
    setTimeout(function(){

        var videoUrl = "/mpat/web/app/uploads/2018/12/rbb_quiz_video.mp4";
        //createVideoTemplate(videoURL);
        setVideoURL(videoUrl);
        createTimerVideoTemplate();
        createTimerVideo();
        createScoreTemplate();
        navigateButtons();
        chooseAnswer();   
    }, 1850);
});


// Global Variables 
var seconds = 0, minutes = 0, hours = 0, t = 0;
var btnIndex = 0;
var btnsList = null;
var is_correct = false;
var correctAns = null;
var selectedAns = null;
var questionRowIndex = null;
var questionStyleRowIndex = null;

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


function createToggleTrackingButtonTemplate(id, bgColor, txt, btnWidth, btnHeight, bColor, bRadius, bWidth, fColor, padding, pTop, pLeft, fSize) {
    var mainContainer = document.getElementsByClassName("page-elements-container")[0];
    var mainDiv = document.createElement("div");
    mainDiv.classList.add("page-element");
    mainDiv.classList.add("toggletracking-component");
    mainDiv.style.backgroundColor = bgColor;
    mainDiv.style.borderRadius = bRadius;
    mainDiv.style.borderWidth = bWidth;
    mainDiv.style.left = pLeft;
    mainDiv.style.top = pTop;
    mainDiv.style.width = btnWidth;
    mainDiv.style.height = btnHeight;
    mainDiv.style.zIndex = "1000";
    mainDiv.style.border = "solid";
    mainDiv.style.borderColor = bColor;
    mainDiv.style.display = "block";
    mainDiv.id = id;

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
    child5Span.innerText = txt;
    child5Span.style.color = fColor;
    child5Span.style.padding = padding;
    child5Span.style.fontSize = fSize;

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
        // compareEndTime();
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
        // compareStartTime();
        // compareEndTime();
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("timer").innerHTML = "EXPIRED";
        }
    }, 1000);
}


function createVideoTemplate(url) {
    var mainContainer = document.getElementsByClassName("page-elements-container")[0];
    var mainDiv = document.createElement("div");
    mainDiv.classList.add("page-element");
    mainDiv.classList.add("video-component");

    var child1Div = document.createElement("div");
    child1Div.style.left = "0px";
    child1Div.style.top = "0px";
    child1Div.style.width = "0px";
    child1Div.style.height = "0px";
    child1Div.style.position = "absolute";

    var child2Div = document.createElement("div");
    child2Div.classList.add("page-element-content");
    child2Div.classList.add("video-content");
    child2Div.classList.add("fullscreen");

    var child3Div = document.createElement("div");
    child3Div.style.position = "absolute";
    child3Div.style.overflow = "hidden";
    child3Div.style.width = "100%";
    child3Div.style.height = "100#";
    child3Div.style.display = "block";

    var child4Div = document.createElement("div");
    child4Div.classList.add("video-wrapper");

    var child5Div = document.createElement("object");
    child5Div.type = "video/mp4";
    child5Div.data = url;

    child4Div.appendChild(child5Div);
    child3Div.appendChild(child4Div);
    child2Div.appendChild(child3Div);
    child1Div.appendChild(child2Div);
    mainDiv.appendChild(child1Div);
    mainContainer.appendChild(mainDiv);
}


function compareStartTime() {
    questionsTable.questionsRows.forEach(function(v1, i1) {
        if (v1.start_time == seconds) {
            questionRowIndex = i1;
            var questionNumOfAns = v1.number_of_answers;
            questionStyleTable.questionStyleRows.forEach(function(v2, i2) {
                if (v2.number_of_answers == questionNumOfAns) {
                    questionStyleRowIndex = i2;
                    createToggleTrackingButtonTemplate(
                        "btn_id"+i2, 
                        v2.background_color, 
                        v2.button_text, 
                        v2.button_width, 
                        v2.button_height, 
                        v2.border_color, 
                        v2.border_radius, 
                        v2.border_width, 
                        v2.font_color, 
                        v2.padding, 
                        v2.position_top, 
                        v2.position_left, 
                        v2.font_size
                    );
                }
            });
            btnsList = document.getElementsByClassName("toggletracking-component");
        }
    });
    compareEndTime();
}


function compareEndTime() {
    if (document.getElementsByClassName("toggletracking-component").length > 0) {
        var end_time = questionsTable.questionsRows[questionRowIndex].end_time;
        if (end_time == seconds) {
            console.log("questionRowID >> ", questionRowIndex);
            if (checkAnswer(questionRowIndex)) {
                console.log("True Answer!");
            } else {
                console.log("Wrong Answer!");
            }
            for (var i = 0; i < 9; i++) {
                if (document.getElementById("btn_id"+i)) {
                    document.getElementById("btn_id"+i).remove();
                }
            }
            btnsList = [];
            btnIndex = null;
            is_correct = false;
            selectedAns = null;
            correctAns = null;
            questionRowIndex = null;
        }    
    }
}


function navigateButtons() {
    document.addEventListener('keyup', function(e) {
        btnUp: if (e.keyCode == 38) { //up
            if (btnIndex == 0) {
                break btnUp;
            }
            btnIndex--;
        }
        btnDown: if (e.keyCode == 40) { //down
            if (btnIndex >= btnsList.length-1) {
                break btnDown;
            }
            btnIndex++;
        }
        for (var i = 0; i < btnsList.length; i++) {
            btnsList[i].blur();
            if (btnsList[i].classList.contains("btnActive")) {
                btnsList[i].classList.remove("btnActive");   
                btnsList[i].style.borderColor = questionStyleTable.questionStyleRows[questionStyleRowIndex].border_color; 
            }
        }
        btnsList[btnIndex].focus();
        btnsList[btnIndex].style.borderColor = "yellow";
        btnsList[btnIndex].classList.add("btnActive");
    }); 
}


function chooseAnswer() {
    document.addEventListener('keyup', function (e) {
        if (e.keyCode == 13) {
            for (var i = 0; i < btnsList.length; i++) {
                btnsList[i].style.backgroundColor = questionsTable.questionsRows[1].background_color;
                if (btnsList[i].classList.contains("btnSelected")) {
                    btnsList[i].classList.remove("btnSelected"); 
                }
            }
            btnsList[btnIndex].style.backgroundColor = "green";
            btnsList[btnIndex].classList.add("btnSelected");
        }
    })
}


function checkAnswer(index) {
    correctAns = questionsTable.questionsRows[index].correct_ans;

    for (var i = 0; i < btnsList.length; i++) {
        if (btnsList[btnIndex] == btnsList[0]) {
            selectedAns = "A";
        } else if (btnsList[btnIndex] == btnsList[1]) {
            selectedAns = "B";
        } else if (btnsList[btnIndex] == btnsList[2]) {
            selectedAns = "C";
        } else if (btnsList[btnIndex] == btnsList[3]) {
            selectedAns = "D";
        }
    }

    if (correctAns == selectedAns) {
        is_correct = true;
    }
    console.log("ButtonIndex >> ", btnIndex);
    console.log("selectedAnswer: ", selectedAns);
    console.log("correctAnswer: ", correctAns);
    console.log("index: ", index);
    return is_correct;
}