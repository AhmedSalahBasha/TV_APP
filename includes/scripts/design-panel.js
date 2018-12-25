//global variables
var buttonNumber = null;


/**
 * a small function to show the buttons numbers DropDownList depends on the selected value 
 */
function detectQuestionType() {
    var type = document.getElementById("number_of_answers").value;
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


/**
 * create DropDownList for how many buttons depends on the previous select option how many answers
 * @param {string} type is the selected value of number of answers DropDownList
 */
function createSelectOption(type) {
    var form = document.getElementById("form");

    var div = document.createElement("div");
    div.classList.add("form-group");
    div.classList.add("col-sm-10");
    div.id = "numList";

    var label = document.createElement("label");
    label.innerText = "Button Number: ";
    label.setAttribute("for","buttonNum");

    var select = document.createElement( 'select' );
    select.classList.add("form-control");
    select.setAttribute("onchange", "loadStyleOptionsTemplate()");
    select.onchange = loadStyleOptionsTemplate;
    select.id = "buttonNum";

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


/**
 * load button style options template when select the button number
 */
var loadStyleOptionsTemplate = function () {
    var container = document.getElementById("questionStyleOption");
    req = new XMLHttpRequest();
    req.open("GET", "../../../web/app/plugins/rbb-quiz/includes/templates/question-style-form.html", false);
    req.send(null);
    container.innerHTML = req.responseText;
    jscolor.installByClassName("jscolor");
}

/**
 * Submit ajax post request from question_style_form
 */
function submitQuestionStyleForm() {
    $('#question_style_form').submit(function(e){
        e.preventDefault();
        buttonNumber = document.getElementById("buttonNum").value;
        var backgroundColor = $("#backgroundColor").val();
        var is_border = $('input[name=is_border]:checked').val();
        var borderRadius = $("#borderRadius").val();
        var borderWidth = $("#borderWidth").val();
        var fontColor = $("#fontColor").val();
        var padding = $("#padding").val();
        var positionTop = $("#positionTop").val();
        var positionLeft = $("#positionLeft").val();
        var fontSize = $("#fontSize").val();

        $.ajax({ 
            dataType: 'json',
            type: 'post',
            data: {
                action: 'submit_question_style_form',
                buttonNumber: buttonNumber,
                backgroundColor: backgroundColor,
                is_border: is_border,
                borderRadius: borderRadius,
                borderWidth: borderWidth,
                fontColor: fontColor,
                padding: padding,
                positionTop: positionTop,
                positionLeft: positionLeft,
                fontSize: fontSize,
            },
            url: ajaxurl,
            success: function(data) {
                $(".msgDiv").html(data.data.message);
                if (data.data.status == 1) {
                    document.getElementById("question_style_form").reset();
                }
            },
            error: function(err) {
                alert(err);
                $(".msgDiv").html(data.data.message);
            }
        });
    });
};