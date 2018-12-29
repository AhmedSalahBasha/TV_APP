
/**
 * Submit ajax post request from add_question_form
 */
$(document).ready(function() {
    $('#add_question_form').submit(function(e){
        e.preventDefault();
        var number = $("#number").val();
        var number_of_answers = $("#number_of_answers").val();
        var correct_ans = $('input[name=correct_ans]:checked').val();
        var start_time = $("#start_time").val();
        var end_time = $("#end_time").val();
        var cost = $("#cost").val();

        $.ajax({ 
            dataType: 'json',
            type: 'post',
            data: {
                action: 'submit_question_form',
                number: number,
                number_of_answers: number_of_answers,
                correct_ans: correct_ans,
                start_time: start_time,
                end_time: end_time,
                cost: cost
            },
            url: ajaxurl,
            success: function(data) {
                $(".msgDiv").html(data.data.message);
                if (data.data.status == 1) {
                    document.getElementById("add_question_form").reset();
                }
            },
            error: function(err) {
                alert(err);
                $(".msgDiv").html(data.data.message);
            }
        });
    });
});