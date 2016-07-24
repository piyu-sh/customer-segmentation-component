$(function () {


    $('.query-region .draggable-btn').each(function () {
        $(this).draggable({
            containment: $(this).parent().parent(),
            scope: $(this).parent().parent().parent().prop("class"),
            cancel: false, helper: "original", revert: "invalid"
        });
    });

    // $(".query-selectors > .draggable-btn ").draggable({
    //     cancel: false, helper: "clone", revert: "invalid"
    // });

    $(".query-selectors > .draggable-segment ").draggable({
        cancel: false, helper: "clone", revert: "invalid"
    });
    $(".query-selectors > .draggable-logic ").draggable({
        cancel: false, helper: "clone", revert: "invalid",
        scope: "draggable-logic"
    });

    // $(".droppable-main-region").droppable({
    //     accept: ".draggable-logic",
    //     activeClass: "droppable-highlight"
    // });

    $(".query-region .and-selector,.query-region .or-selector").each(function () {
        $(this).droppable({
            scope: "draggable-logic",
            activeClass: "droppable-highlight"
        });
    });

    $(".exclude-section").each(function () {
        $(this).droppable({
            scope: $(this).parent().parent().prop("class"),
            activeClass: "droppable-highlight",
            drop: function (event, ui) {
                // $(ui.draggable).remove();
                  var temp=  $(ui.draggable).remove().css({top:"0px",left:"0px"});
                // ui.draggable.appendTo($(this)).fadeIn();
                $(this).append(temp).animate({duration:600});
            }
        });
    });
    $(".include-section").each(function () {
        $(this).droppable({
            scope: $(this).parent().parent().prop("class"),
            activeClass: "droppable-highlight"
        });
    });


});