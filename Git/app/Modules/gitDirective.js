(function () {

    angular.module('gitDirective', ['gitService']);

    function gitDirective($document, $interval, gitService) {
        var directiveItems = [];

        function link(scope, element, attrs) {

            scope.cels = [];

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
                var self = this;
                var cel = { x: x, y: y, isHover: false, width: width, link: false };
                cel.fill = function (color) {
                    var ctx = getContext();
                    ctx.fillStyle = color;
                    ctx.fillRect(cel.x * cel.width, cel.y * cel.width, cel.width - 1, cel.width - 1);
                };
                cel.render = function () {
                    if (!cel.link && !cel.isHover) cel.fill("#eee");
                    if (cel.link && !cel.isHover) cel.fill("#0f0");
                    if (!cel.link && cel.isHover) cel.fill("#dfd");
                    if (cel.link && cel.isHover) cel.fill("#0d0");
                    
                };
                return cel;
            }

            scope.nodes = Array(10);

            element.find("canvas").on("mousemove", function (event) {
                scope.$apply(function () {
                    var x = Math.floor(event.offsetX / 40);
                    var y = Math.floor(event.offsetY / 40);
                    if (x > -1 && x < 10 && y > -1 && y < 10) {
                        if (current.cel) {
                            if (current.cel.x != x || current.cel.y != y) {
                                scope.cels[current.cel.x][current.cel.y].isHover = false;
                                scope.cels[x][y].isHover = true;
                                //console.log(x, y);
                                scope.cels[current.cel.x][current.cel.y].render();
                            }

                        } else {
                            scope.cels[x][y].isHover = true;
                            
                            //console.log(x, y);
                        }

                        scope.cels[x][y].render();
                        current.cel = { x: x, y: y };
                    }
                });
            });

            element.find("canvas").on("click", function (event) {
                scope.$apply(function () {
                    scope.cels[current.cel.x][current.cel.y].link = !scope.cels[current.cel.x][current.cel.y].link;
                    scope.cels[current.cel.x][current.cel.y].render();
                });
            });

            element.find("canvas").on("mouseout", function (event) {
                if (current.cel) {
                    scope.$apply(function () {
                        scope.cels[current.cel.x][current.cel.y].isHover = false;
                        scope.cels[current.cel.x][current.cel.y].render();
                        current.cel = null
                    });
                    //console.log(x, y);
                }
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
                    scope.cels[i] = [];
                    for (var n = 0; n < length; n++) {
                        scope.cels[i][n] = newCel(i, n, 40);
                        scope.cels[i][n].fill("#eee");
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
                '<canvas></canvas>  <pre>{{cels}} \n  {{current}}</pre>'
        };

    }

    angular.module('gitDirective').directive('gitDirective', gitDirective);


})();