(function () {

    angular.module('gitDirective', ['gitService']);

    function gitDirective($document, $interval, gitService) {
        var directiveItems = [];

        var cels = [];

        cels.render = {};

        cels.render.empty = function (x, y) {

        };

        function link(scope, element, attrs) {

            var elements = { canvas: element.find("canvas").get(0), manual: element.find(".manual") };

            var current = { cel: null };

            function getContext() {
                var ctx = elements.canvas.getContext('2d');
                return ctx;
            }

            function clearCanvas(width) {
                elements.canvas.height = width;
                elements.canvas.width = width;
            }

            function newCel(x, y, width) {
                var cel = { x: x, y: y, backGroundColor: "#ddd", isHover: false, width: width };
                cel.fill = function (color) {
                    var ctx = getContext();
                    ctx.fillStyle = color;
                    ctx.fillRect(cel.x * cel.width, cel.y * cel.width, cel.width - 1, cel.width - 1);
                };
                return cel;
            }

            scope.nodes = Array(10);

            element.find("canvas").on("mousemove", function (event) {
                scope.$apply(function () {
                    var x = Math.floor(event.offsetX / 40);
                    var y = Math.floor(event.offsetY / 40);
                    if (current.cel) {
                        if(current.cel  )
                    }
                    
                });
            });
            //var promise = gitService.loadData("data.json");

            //promise.then(function () {
            //    scope.data = gitService.data;
            //    scope.index = gitService.index;
            //    scope.edges = gitService.edges;
            //    this.renderGit(400, 10);
            //});

            this.renderGit = function (width, length) {
                var self = this;
                clearCanvas(width);
                var stepWidth = width / length;
                var ctx = getContext();
                //ctx.font = "bold 12px sans-serif";
                //ctx.fillText("git", 20, 20);

                for (var i = 0; i < length; i++) {
                    cels[i] = [];
                    for (var n = 0; n < length; n++) {
                        cels[i][n] = newCel(i, n, 40);
                        cels[i][n].fill("#eee");
                    }
                }

                elements.manual.width(width);
                elements.manual.height(width);


                ctx.fillStyle = "#000";
                ctx.font = "bold 12px sans-serif";
                ctx.fillText("git", 20, 20);

            }

            this.renderGit(400, 10);

            scope.click = function (y, x) {
                console.log(y, x);
            };





        }
        return {
            link: link,
            scope: {

            },
            template: '' +
                //'<div class="manual"> \n' +
                //'   <div ng-repeat="item in [0,1,2,3,4,5,6,7,8,9]" class="line"> \n' +
                //'       <div ng-repeat="subitem in [0,1,2,3,4,5,6,7,8,9]" class="time" ng-click="click(item, subitem)"></div> \n' +
                //'   </div> \n' +
                //'</div> \n ' +
                '<canvas></canvas>  <pre>{{nodes}} \n {{index}} \n {{edges}} \n {{x}} / {{y}}</pre>'
        };

    }

    angular.module('gitDirective').directive('gitDirective', gitDirective);


})();