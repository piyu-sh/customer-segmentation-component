$(function() {

    var componentTemplates = templates; // from templates.js


    $("#add-btn").click(function(e) {
        if ($("#card-container .query-selectors").length > 0) {
            var dialog = document.querySelector('#info-dialog');
            if (!dialog.showModal) {
                dialogPolyfill.registerDialog(dialog);
            }
            $("#info-dialog p").html("Please save the ongoing query first...")
            dialog.showModal();
            dialog.querySelector('.close').addEventListener('click', function() {
                dialog.close();
            });
        } else {
            $("#card-container").html(componentTemplates.mainCardTemplate);
            attachDragDropFunctionality();
            $("#save-btn").click(function(e) {
                var $saveCard=$("#card-container .generated-query");
                $("div.saved-queries").append($saveCard);
                $("#card-container").html(componentTemplates.mainCardDefaultTemplate);
            });
        }

    });




    function attachDragDropFunctionality() {
        $(".query-selectors > .draggable-segment ").draggable({
            cancel: false,
            helper: "clone",
            revert: "invalid",
            scroll: true
        });
        $(".query-selectors > .draggable-logic ").draggable({
            cancel: false,
            helper: "clone",
            revert: "invalid",
            scroll: true
        });

        $(".query-region").droppable({
            accept: ".query-selectors > .draggable-logic",
            activeClass: "droppable-highlight"
        });




        $(".generated-query").parent().on("drop", function(event, ui) {

            if (!$(ui.draggable).hasClass("draggable-segment-option")) {
                $(event.target).append(getTemplate(ui.draggable));
            }

            var queryString = parseDomForQuery(this);
            $(".generated-query >div:last-child").html(queryString);

            if (!$(".query-region").droppable("option", "disabled")) {
                $(".query-region").droppable("option", "disabled", true);
            }

            $(".query-region .exclude-section,.query-region .include-section").each(function() {

                $(this).sortable({
                    containment: $(this).parent(),
                    items: ">*:not(:first-child)"
                });
            });

            $(".query-region .and-selector,.query-region .or-selector").each(function() {
                $(this).droppable({
                    disabled: false,
                    activeClass: "droppable-highlight"
                });
            });


            $('.query-region .draggable-btn').each(function() {
                $(this).draggable({
                    containment: $(this).parent().parent(),
                    scope: $(this).parent().parent().parent().prop("class"),
                    cancel: "",
                    helper: "original",
                    revert: "invalid",
                    connectToSortable: ".mdl-grid>div"
                });
            });

            $(".exclude-section").each(function() {
                $(this).droppable({
                    scope: $(this).parent().parent().prop("class"),
                    activeClass: "droppable-highlight"
                });
            });
            $(".include-section").each(function() {
                $(this).droppable({
                    scope: $(this).parent().parent().prop("class"),
                    activeClass: "droppable-highlight"
                });
            });

        });


        function getTemplate(component) {
            var templateCode;
            switch ($(component).html()) {
                case "And":
                    templateCode = templates.andTemplate;
                    break;
                case "Or":
                    templateCode = templates.orTemplate;
                    break;
                case "Location":
                    templateCode = templates.locationTemplate;
                    break;
                case "Browser":
                    templateCode = templates.browserTemplate;
                    break;
                case "OS":
                    templateCode = templates.osTemplate;
                    break;
                case "Day":
                    templateCode = templates.dayTemplate;
                    break;
                case "Visitor type":
                    templateCode = templates.visitorTemplate;
                    break;
                case "Mobile":
                    templateCode = templates.mobileTemplate;
                    break;
            }
            return templateCode
        }

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
                            queryString += " " + selectorType(component) + " ";
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
                                queryString += " " + selectorType(component) + " ";
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

    }


});