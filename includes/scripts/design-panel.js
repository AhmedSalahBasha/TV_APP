function detectQuestionType() {
    var type = document.getElementById("question-type").value;
    if (type == "2") {
        removeNumList();
        createSelectOption(type);
    } else if (type == "3") {
        removeNumList();
        createSelectOption(type);
    } else {
        removeNumList();
        createSelectOption(type);
    }
}


function createSelectOption(type) {
    var form = document.getElementById("form");

    var div = document.createElement("div");
    div.classList.add("form-group");
    div.classList.add("col-sm-10");
    div.id = "numList";

    var label = document.createElement("label");
    label.innerText = "Button Number: ";
    label.setAttribute("for","qNum");

    var select = document.createElement( 'select' );
    select.classList.add("form-control");
    select.setAttribute("onchange", "loadStyleOptionsTemplate()");
    select.onchange = loadStyleOptionsTemplate;
    select.id = "qNum";

    var option = null;
    var inputdata = null;

    if (type == "2") {
        inputdata = [1,2];
    } else if (type == "3") {
        inputdata = [1,2,3];
    } else {
        inputdata = [1,2,3,4];
    }
 
    inputdata.forEach(function( item ) {
        option = document.createElement('option');
        option.value = option.textContent = item;
        select.appendChild( option );
    });

    div.appendChild(label);
    div.appendChild(select);
    form.appendChild(div);
}

function removeNumList() {
    if (document.getElementById("numList")) {
        document.getElementById("numList").remove();
    }
}

var loadStyleOptionsTemplate = function () {
    var container = document.getElementById("questionStyleOption");
    req = new XMLHttpRequest();
    req.open("GET", "../../../web/app/plugins/rbb-quiz/includes/templates/question-style-form.html", false);
    req.send(null);
    container.innerHTML = req.responseText;
    jscolor.installByClassName("jscolor");
}