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
    container.innerHTML = question_style_form;
    // req = new XMLHttpRequest();
    // req.open("GET", "../../../web/app/plugins/rbb-quiz/includes/templates/question-style-form.html", false);
    // req.send(null);
    // container.innerHTML = req.responseText;
    jscolor.installByClassName("jscolor");

    var number_of_answers = $("#number_of_answers").val();
    var button_number = $("#buttonNum").val();
    questionStyleTable.questionStyleRows.forEach(function(v,i) {
        if(number_of_answers == v.number_of_answers && button_number == v.button_number) {
            document.getElementById("backgroundColor").value = v.background_color;
            document.getElementById("buttonText").value = v.button_text;
            document.getElementById("borderRadius").value = v.border_radius;
            document.getElementById("borderWidth").value = v.border_width;
            document.getElementById("fontColor").value = v.font_color;
            document.getElementById("padding").value = v.padding;
            document.getElementById("positionTop").value = v.position_top;
            document.getElementById("positionLeft").value = v.position_left;
            document.getElementById("fontSize").value = v.font_size;
        }
    });
}


/**
 * Submit ajax post request from question_style_form
 */
function submitQuestionStyleForm() {
    $('#question_style_form').submit(function(e){
        e.preventDefault();
        var number_of_answers = $("#number_of_answers").val();
        var button_number = $("#buttonNum").val();
        var background_color = $("#backgroundColor").val();
        var button_text = $("#buttonText").val();
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
                number_of_answers: number_of_answers,
                button_number: button_number,
                background_color: background_color,
                button_text: button_text,
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



var question_style_form = 
'<form class="form-horizontal" method="post" id="question_style_form">'+
    '<div class="form-group col-sm-10">'+
        '<label for="backgroundColor">Background Color</label>'+
        '<input id="backgroundColor" value="ffcc00" class="jscolor {width:243, height:150, position:\'right\',borderColor:\'#FFF\', insetColor:\'#FFF\', backgroundColor:\'#666\'}">'+
    '</div>'+
    '<div class="form-group col-sm-10">'+
        '<label for="buttonText">Text</label>'+
        '<input type="text" class="form-control" id="buttonText" placeholder="Button Text  ex.(A)" required>'+
    '</div>'+
    '<div class="form-group col-sm-10">'+
        '<label for="borderRadius">Border Radius</label>'+
        '<input type="text" class="form-control" id="borderRadius" placeholder="Border Radius  ex.(8px)" required>'+
    '</div>'+
    '<div class="form-group col-sm-10">'+
        '<label for="borderWidth">Border Width</label>'+
        '<input type="text" class="form-control" id="borderWidth" placeholder="Border Width  ex.(3px)" required>'+
    '</div>'+
    '<div class="form-group col-sm-10">'+
        '<label for="fontColor">Font Color</label>'+
        '<input id="fontColor" value="ffcc00" class="jscolor {width:243, height:150, position:\'right\',borderColor:\'#FFF\', insetColor:\'#FFF\', backgroundColor:\'#666\'}">'+
    '</div>'+
    '<div class="form-group col-sm-10">'+
        '<label for="padding">Padding</label>'+
        '<input type="text" class="form-control" id="padding" placeholder="Padding Top and Left  ex.(20px 15px)" required>'+
    '</div>'+
    '<div class="form-group col-sm-10">'+
        '<label for="positionTop">Position Top</label>'+
        '<input type="text" value="450px" class="form-control" id="positionTop" placeholder="Position Top  ex.(350px)" required>'+
        '<label for="positionLeft">Position Left</label>'+
        '<input type="text" value="1050px" class="form-control" id="positionLeft" placeholder="Position Left  ex.(1070px)" required>'+
    '</div>'+
    '<div class="form-group col-sm-10">'+
        '<label for="fontSize">Font Size</label>'+
        '<input type="text" class="form-control" id="fontSize" placeholder="Font Size  ex.(16px)" required>'+
    '</div>'+
    '<div class="clearfix"></div>'+
    '<input type="hidden" name="action" value="submit_question_style_form">'+
    '<div class="form-group col-sm-10">'+
        '<input type="submit" onclick="submitQuestionStyleForm()" name="btnSubmit" value="Submit Button Style" class="btn btn-primary">'+
    '</div>'+
    '<div class="msgDiv form-group col-sm-10"></div>'+
'</form>'+
'<div class="clearfix"></div>';