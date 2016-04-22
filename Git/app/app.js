
angular.module('app', ['ngRoute', 'gitDirective', 'gitService']);

(function () {

    function MainCtrl($route, $routeParams, $location, $http) {
        this.name = "test name";
        this.location = $location;
        this.route = $route;







        this.render = function () {
            var self = this;
            clearCanvas();
            var ctx = getContext();
            var k = 500 / self.testDataService.length;
            for (var i = 0; i < self.testDataService.length; i++) {
                var y = self.testDataService[i].number * self.testDataService.length * k;
                ctx.fillRect(i*k, y, 1, 1);
            }
        };




    }

    angular.module('app').controller('MainCtrl', MainCtrl);

})();

//angular.bootstrap("html", ['app']);



