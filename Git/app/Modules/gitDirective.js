(function () {

    angular.module('gitDirective', ['gitService']);

    function gitDirective($document, $interval, gitService) {
        var directiveItems = [];


        function link(scope, element, attrs) {

            var elements = { canvas: element.find("canvas").get(0) };

            function getContext() {
                var ctx = elements.canvas.getContext('2d');
                return ctx;
            }

            function clearCanvas(width) {
                elements.canvas.height = width;
                elements.canvas.width = width;
            }

            


            var promise = gitService.loadData("data.json");

            promise.then(function () {
                scope.data = gitService.data;
                scope.index = gitService.index;
                scope.edges = gitService.edges;
                this.renderGit(400, 10);
            });

            this.renderGit = function (width, length) {
                var self = this;
                clearCanvas(width);
                var stepWidth = width / length;
                var ctx = getContext();
                ctx.font = "bold 12px sans-serif";
                ctx.fillText("git", 20, 20);

                for (var i = 0; i < length; i++) {
                    for (var n = 0; n < length; n++) {
                        ctx.fillStyle = "#ddd";
                        ctx.fillRect(i * stepWidth, n * stepWidth, stepWidth - 1, stepWidth - 1);
                    }
                }

                for (var i = 0; i < scope.edges.length; i++) {
                    var edge = scope.edges[i];
                    console.log(edge);
                    ctx.fillStyle = "#d0d";
                    ctx.fillRect(stepWidth * edge[1], stepWidth * edge[0], stepWidth - 1, stepWidth - 1);
                }

                ctx.fillStyle = "#000";
                ctx.font = "bold 12px sans-serif";
                ctx.fillText("git", 20, 20);

            }





            

            //directiveItems.push({ index: directiveItems.length });

            //scope.items = directiveItems;

            //var current = {

            //};



            //elements.input.on("keyup", function () {
            //    if (current.intervals.input) {
            //        $interval.cancel(current.intervals.input);
            //    }
            //    current.intervals.input = $interval(function () {
            //        scope.input = elements.input.val();
            //        if (scope.onInputchange != undefined && scope.onInputchange) {
            //            $interval(function () {
            //                scope.onInputchange();
            //                console.log("keyPress");
            //            }, 0, 1);
            //        }
            //    }, 800, 1);
            //});





            //element.on("click", function () {
            //    current.triggers.elementClick = true;
            //});



            //scope.$watch("length", function (a, b) {
            //    current.length = 1 * a;
            //    setDropdownMenuLength(a);
            //    console.log("length", a, b);
            //});

            //scope.$watch("src", function (a, b) {
            //    current.k = (scope.src.length - scope.length) / (2000 - current.dropdownMenuHeight);
            //    current.startIndex = 0;
            //    elements.scrollBox.scrollTop(0);
            //    if (scope.styles.dropdownMenu.height == "auto") {
            //        $interval(function () {
            //            setDataWindow(0);
            //        }, 0, 1);
            //    } else {
            //        setDataWindow(0);
            //    }
            //    console.log(current.k);
            //});

        }
        return {
            link: link,
            scope: {

            },
            template: '<canvas></canvas>' +
                '<pre>{{data}} \n {{index}} \n {{edges}}</pre>'
        };

    }

    angular.module('gitDirective').directive('gitDirective', gitDirective);


})();