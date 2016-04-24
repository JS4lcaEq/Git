﻿(function () {

    angular.module('gitDirective', ['gitService']);

    function gitDirective($document, $interval, gitService) {
        var directiveItems = [];


        function link(scope, element, attrs) {

            var elements = { canvas: element.find("canvas").get(0), manual: element.find(".manual") };

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

                elements.manual.width(width);
                elements.manual.height(width);


                ctx.fillStyle = "#000";
                ctx.font = "bold 12px sans-serif";
                ctx.fillText("git", 20, 20);

            }

            scope.click = function (y, x) {
                console.log(y, x);
            };





        }
        return {
            link: link,
            scope: {

            },
            template: '' +
                '<div class="manual"> \n' +
                '   <div ng-repeat="item in data" class="line"> \n' +
                '       <div ng-repeat="subitem in data" class="time" ng-click="click(item.index, subitem.index)"></div> \n' +
                '   </div> \n' +
                '</div> \n <canvas></canvas>  <pre>{{data}} \n {{index}} \n {{edges}}</pre>'
        };

    }

    angular.module('gitDirective').directive('gitDirective', gitDirective);


})();