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
                var $saveCard = $("#card-container .generated-query");
                var $closeBtn = $("<div/>").addClass("close-btn");
                $saveCard.prepend($closeBtn);
                var $selectBtn = $("<span/>").addClass("select-btn");
                $saveCard.prepend($selectBtn);
                $saveCard.addClass("mdl-cell mdl-cell--5-col mdl-cell--1-offset-desktop mdl-card generated-query mdl-shadow--2dp");
                $("div.saved-queries").prepend($saveCard);
                $("#card-container").html(componentTemplates.mainCardDefaultTemplate);
                $("div.saved-queries .generated-query .close-btn").click(function(e) {
                    $(this).parent().remove();
                    if ($("div.saved-queries .generated-query.mdl-shadow--16dp").length > 1) {
                        $("#combine-btn").prop("disabled", false);
                    } else {
                        $("#combine-btn").prop("disabled", true);
                    }
                });
                $("div.saved-queries .generated-query .select-btn").click(function(e) {
                    e.stopImmediatePropagation();
                    $(this).parent().toggleClass("mdl-shadow--16dp");
                    if ($("div.saved-queries .generated-query.mdl-shadow--16dp").length > 1) {
                        $("#combine-btn").prop("disabled", false);
                    } else {
                        $("#combine-btn").prop("disabled", true);
                    }
                });

            });
        }

    });

    $("#combine-btn").click(function(e) {
        var $queryList = $("div.saved-queries .generated-query.mdl-shadow--16dp>div.mdl-card__actions");
        var combinedQuery = "";
        var queryTreeList = [];
        $queryList.each(function(key, value) {
            queryTreeList[key] = createQueryTree($(value).html());
        });
    });


    function createQueryTree(queryString) {
        var queryTree;
        for (var i = 0; i < queryString.length; i++) {
            var nextTokenInfo=nextTokenAndRemains(queryString);
            var nextToken=nextTokenInfo.nextToken;
            var remainingString=nextTokenInfo.remainingString;
            i=queryString.length-remainingString.length;

            if(nextToken=="["){
                queryTree.child.name="unknown"; 
            }
        }
    }

    function nextTokenAndRemains(str) {
        var nextToken;
        var remainingString;
        var i = 0;
        if (str[i] != " ") {
            if (str[i] == "[") {
                nextToken = "[";
                remainingString = str.slice(i + 1);
            } else if (str[i] == "]") {
                nextToken = "]";
                remainingString = str.slice(i + 1);
            } else if (str[i] == "a") {
                nextToken = "and";
                remainingString = str.slice(i + 3);
            } else if (str[i] == "o") {
                if (str[i + 1] == "r") {
                    nextToken = "or";
                } else {
                    nextToken = "os";
                }
                remainingString = str.slice(i + 2);
            } else if (str[i] == "l") {
                nextToken = "location";
                remainingString = str.slice(i + 8);
            } else if (str[i] == "b") {
                nextToken = "browser";
                remainingString = str.slice(i + 7);
            } else if (str[i] == "d") {
                nextToken = "day";
                remainingString = str.slice(i + 3);
            } else if (str[i] == "v") {
                nextToken = "visitor-type";
                remainingString = str.slice(i + 12);
            } else if (str[i] == "m") {
                nextToken = "mobile";
                remainingString = str.slice(i + 6);
            }
        }

        return {
            nextToken: nextToken,
            remainingString: remainingString
        };
    }

    function attachDragDropFunctionality() {
        $(".query-selectors > .draggable-segment ").draggable({
            cancel: false,
            helper: "clone",
            revert: "invalid",
            scroll: true,
            zIndex: 10000
        });
        $(".query-selectors > .draggable-logic ").draggable({
            cancel: false,
            helper: "clone",
            revert: "invalid",
            scroll: true,
            zIndex: 10000
        });

        $(".query-region").droppable({
            disabled: false,
            accept: ".query-selectors > .draggable-logic",
            activeClass: "droppable-highlight"
        });




        $(".generated-query").parent().on("drop", function(event, ui) {

            event.stopImmediatePropagation();
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
                    greedy: true,
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

            //remove on close button click
            $(".query-region .close-btn").click(function(e) {
                $(this).parent().remove();
                attachDragDropFunctionality();
                var queryString = parseDomForQuery($(".generated-query").parent()[0]);
                $(".generated-query >div:last-child").html(queryString);
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