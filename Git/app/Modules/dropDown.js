(function () {

    angular.module('dropDown', []);

    function dropDown($document, $interval) {
        var directiveItems = [];


        function link(scope, element, attrs) {

            directiveItems.push({ index: directiveItems.length });

            scope.items = directiveItems;

            var elements = {
                dropdownMenu: element.find("ul")
                , box: element.find(".directive-dropdown")
                , scrollBox: element.find(".scroll-box")
                , spacers: element.find(".spacer")
                , input: element.find("input")
            };

            var current = {
                scroll: 0
                , k: 1
                , startIndex: 0
                , dropdownMenuHeight: 0
                , length: 0
                , triggers: { scroll: false, elementClick: false }
                , intervals: {input: null, scroll: null}
            };

            scope.styles = {
                dropdownMenu: { "height": "auto" }
                , scrollBox: { "height": "auto" }
                , spacers: { "display": "none" }
            };

            scope.dataWindow = [];

            function setDataWindow(startIndex) {
                scope.dataWindow.length = 0;
                var endIndex = startIndex + current.length;
                if (endIndex > scope.src.length) {
                    endIndex = scope.src.length;
                }
                for (var i = startIndex; i < endIndex; i++) {
                    scope.dataWindow.push(scope.src[i]);
                }
            }

            function setDropdownMenuLength(length) {
                scope.dataWindow.length = 0;
                scope.styles.dropdownMenu.height = "auto";
                elements.box.addClass("open");
                for (var i = 0; i < length; i++) {
                    scope.dataWindow.push({ id: i, text: "text_" + i });
                }
                $interval(function () {
                    current.dropdownMenuHeight = Math.round(elements.dropdownMenu.height());
                    scope.styles.dropdownMenu.height = current.dropdownMenuHeight + "px";
                    scope.styles.scrollBox.height = current.dropdownMenuHeight + "px";
                    elements.spacers.show();

                    elements.dropdownMenu.scrollTop(50);
                    elements.box.removeClass("open");
                    console.log("dropdownMenuHeight", current.dropdownMenuHeight);
                }, 0, 1);
            }

            scope.select = function (item) {
                elements.input.val(item[scope.textFieldname]);
                scope.model = item;
                if (scope.onSelect != undefined && scope.onSelect) {
                    $interval(function () {
                        scope.onSelect();
                        console.log("onSelect", scope.onSelect);
                    }, 0, 1);
                }  
            };

            elements.input.on("keyup", function () {
                if (current.intervals.input) {
                    $interval.cancel(current.intervals.input);
                }
                current.intervals.input = $interval(function () {
                    scope.input = elements.input.val();
                    if (scope.onInputchange != undefined && scope.onInputchange) {
                        $interval(function () {
                            scope.onInputchange();
                            console.log("keyPress");
                        }, 0, 1);
                    }
                }, 800, 1);
            });

            elements.scrollBox.on("scroll", function () {
                    if (!current.triggers.scroll) {
                        current.scroll = elements.scrollBox.scrollTop();
                        current.startIndex = Math.round(current.scroll * current.k);
                        scope.$apply(function () {
                            setDataWindow(current.startIndex);
                        });
                    }
                    current.triggers.scroll = false;
            });

            elements.dropdownMenu.on("scroll", function () {
                var scroll = elements.dropdownMenu.scrollTop();
                elements.dropdownMenu.scrollTop(50);
                if (scroll > 50 && current.startIndex < (scope.src.length - scope.length)) {
                    current.startIndex++;
                    current.triggers.scroll = true;
                    elements.scrollBox.scrollTop(current.startIndex / current.k);
                    scope.$apply(function () {
                        setDataWindow(current.startIndex);
                    });
                }
                if (scroll < 50 && current.startIndex > 0) {
                    current.startIndex--;
                    current.triggers.scroll = true;
                    elements.scrollBox.scrollTop(current.startIndex / current.k);
                    scope.$apply(function () {
                        setDataWindow(current.startIndex);
                    });
                }
            });

            element.on("click", function () {
                current.triggers.elementClick = true;
            });

            $document.on("click", function () {
                if (current.triggers.elementClick) {
                    elements.box.addClass("open");
                    elements.dropdownMenu.scrollTop(50);
                } else {
                    elements.box.removeClass("open");
                }
                current.triggers.elementClick = false;
            });

            scope.$watch("length", function (a, b) {
                current.length = 1 * a;
                setDropdownMenuLength(a);
                console.log("length", a, b);
            });

            scope.$watch("src", function (a, b) {
                current.k = (scope.src.length - scope.length) / (2000 - current.dropdownMenuHeight);
                current.startIndex = 0;
                elements.scrollBox.scrollTop(0);
                if (scope.styles.dropdownMenu.height == "auto") {
                    $interval(function () {
                        setDataWindow(0);
                    }, 0, 1);
                } else {
                    setDataWindow(0);
                }
                console.log(current.k);
            });

        }
        return {
            link: link,
            scope: {
                src: "<",
                length: "<",
                textFieldname: "<",
                model: "=",
                input: "=",
                onInputchange: "&",
                onSelect: "&"
            },
            template: '' +
'<div class="directive-dropdown input-group dropdown">' +
'   <input type="text" class="form-control">' +
'   <div class="dropdown-menu">' +
'       <div class="scroll-box" ng-style="styles.scrollBox"><div class="scroll-slider"></div></div>' +
'       <ul ng-style="styles.dropdownMenu">' +
'           <li class="spacer"></li>' +
'           <li ng-repeat="item in dataWindow" ng-click="select(item)"><a title="{{item[textFieldname]}}">{{item[textFieldname]}}</a></li>' +
'           <li class="spacer"></li>' +
'       </ul>' +
'   </div>' +
'   <div class="input-group-addon"><span class="glyphicon glyphicon-menu-down" aria-hidden="true"></span></div>' +
'</div>'
        };

    }

    angular.module('dropDown').directive('dropDown', dropDown);


})();