$(function() {

    var componentTemplates = templates;

    $('.query-region .draggable-btn').each(function() {
        $(this).draggable({
            containment: $(this).parent().parent(),
            scope: $(this).parent().parent().parent().prop("class"),
            cancel: false,
            helper: "original",
            revert: "invalid",
            connectToSortable: ".mdl-grid>div",
        });
    });

    $(".query-selectors > .draggable-segment ").draggable({
        cancel: false,
        helper: "clone",
        revert: "invalid"
    });
    $(".query-selectors > .draggable-logic ").draggable({
        cancel: false,
        helper: "clone",
        revert: "invalid",
        scope: "draggable-logic"
    });

    $(".query-region").droppable({
        scope: "draggable-logic",
        activeClass: "droppable-highlight"
    });

    $(".exclude-section").each(function() {
        $(this).droppable({
            scope: $(this).parent().parent().prop("class"),
            activeClass: "droppable-highlight",
        });
    });
    $(".include-section").each(function() {
        $(this).droppable({
            scope: $(this).parent().parent().prop("class"),
            activeClass: "droppable-highlight"
        });
    });

    $(".query-region .exclude-section,.query-region .include-section").each(function() {
        $(this).sortable({
            revert: true,
            containment: $(this).parent(),
            items: ">*:not(:first-child)"
        });
    });

    $(".generated-query").parent().on("drop", function(event, ui) {

        $(event.target).append($(templates.orTemplate));

        var queryString = parseDomForQuery(this);
        $(".generated-query >div:last-child").html(queryString);

        if (!$(".query-region").droppable("option", "disabled")) {
            $(".query-region").droppable("option", "disabled", true);

            $(".query-region .and-selector,.query-region .or-selector").each(function() {
                $(this).droppable({
                    disabled: false,
                    scope: "draggable-logic",
                    activeClass: "droppable-highlight"
                });
            });
        }
    });


    function parseDomForQuery(component) {
        var queryString = "";
        if (isLogicSelector(component)) {
            queryString = "[";
        }
        var compChildren = component.children;
        if (compChildren.length > 0) {
            var appendLogic = false;
            $(compChildren).each(function(index) {
                if (isSegmentSelector(this)) {
                    if (appendLogic) {
                        queryString += " " + selectorType(component) + " "; //check for last occurence and add "'"
                    }
                    appendLogic = true;
                    queryString += "'" + selectorType(this) + "=";
                    var includedList = includedOptions(this);
                    var excludedList = excludedOptions(this);
                    if (includedList.length == 0) {
                        queryString += "none";
                    } else if (excludedList.length == 0) {
                        queryString += "all";
                    } else if (includedList.length > excludedList.length) {
                        queryString += "all except " + excludedList.join(",");
                    } else {
                        queryString += includedList.join(",");
                    }
                    queryString += "'";
                } else {
                    if (isLogicSelector(this)) {
                        if (appendLogic) {
                            queryString += " " + selectorType(component) + " "; //check for last occurence and add "'"
                        }
                        appendLogic = true;
                    }
                    queryString += parseDomForQuery(this);
                }
            });
        }
        if (isLogicSelector(component)) {
            queryString += "]";
        }
        return queryString;
    }

    function isLogicSelector(component) {
        if ($(component).hasClass("and-selector") || $(component).hasClass("or-selector")) {
            return true;
        } else {
            return false;
        }
    }

    function selectorType(component) {
        var type;
        if ($(component).hasClass("and-selector")) {
            type = "and";
        } else if ($(component).hasClass("or-selector")) {
            type = "or";
        } else if ($(component).hasClass("location-selector")) {
            type = "location";
        } else if ($(component).hasClass("browser-selector")) {
            type = "browser";
        } else if ($(component).hasClass("os-selector")) {
            type = "os";
        } else if ($(component).hasClass("day-selector")) {
            type = "day";
        } else if ($(component).hasClass("visitor-type-selector")) {
            type = "visitor-type";
        } else if ($(component).hasClass("mobile-selector")) {
            type = "mobile";
        }
        return type;
    }

    function isSegmentSelector(component) {
        return !isLogicSelector(component) && typeof selectorType(component) != 'undefined';
    }

    function includedOptions(component) {
        var optionsArray = [];
        $(component).find(".include-section button:not(*[class*='ui-sortable-placeholder'])").each(function() {
            optionsArray.push($(this).html());
        });
        return optionsArray;
    }

    function excludedOptions(component) {
        var optionsArray = [];
        $(component).find(".exclude-section button:not(*[class*='ui-sortable-placeholder'])").each(function() {
            optionsArray.push($(this).html());
        });
        return optionsArray;
    }


});