//global variables
var button_number = null;


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
        button_number = document.getElementById("buttonNum").value;
        var background_color = $("#backgroundColor").val();
        var border = $('input[name=is_border]:checked').val();
        var border_radius = $("#borderRadius").val();
        var border_width = $("#borderWidth").val();
        var font_color = $("#fontColor").val();
        var padding = $("#padding").val();
        var position_top = $("#positionTop").val();
        var position_left = $("#positionLeft").val();
        var font_size = $("#fontSize").val();

        $.ajax({ 
            dataType: 'json',
            type: 'post',
            data: {
                action: 'submit_question_style_form',
                button_number: button_number,
                background_color: background_color,
                border: border,
                border_radius: border_radius,
                border_width: border_width,
                font_color: font_color,
                padding: padding,
                position_top: position_top,
                position_left: position_left,
                font_size: font_size,
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