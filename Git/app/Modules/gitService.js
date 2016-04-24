(function () {

    angular.module('gitService', []);

    /*  */
    function gitService($http) {

        this.data = {};
        this.index = {}
        this.edges = [];

        this.loadData = function (url) {
            var self = this;
            var promise = $http({ method: "GET", url: url }).
              then(function (response) {
                  self.data = response.data;
                  self.setIndex();
                  self.setEdges();
                  self.iniLine();
              }, function (response) {

              });
            return promise;
        };

        this.setIndex = function () {
            var self = this;
            self.index = null;
            self.index = {};
            var i = 0;
            for (var key in self.data) {
                self.index[key] = i;
                self.data[key].index = i;
                i++;
            }
        };

        this.setEdges = function () {
            var self = this;
            self.edges.length = 0;
            var i = 0;
            for (var key in self.data) {
                var item = self.data[key];
                for (var n = 0; n < item.PARENTS.length; n++) {
                    var parentKey = item.PARENTS[n];
                    //console.log(parentKey);
                    self.edges.push([i, self.index[parentKey]]);
                }
                i++;
            }
        };

        this.iniLine = function () {
            var self = this;
            for (var key in self.data) {
                var item = self.data[key];
                //console.log(item);
                if (item.PARENTS.length > 0) {
                    var parentKey = item.PARENTS[0];
                    console.log(item.HASH, parentKey);
                    item.line = self.index[parentKey];
                } else {
                    item.line = 0;
                }
            }
        };

        this.test = function () {
            return "module: 'git', service: 'gitService', function: 'test'"
        };
    }

    angular.module('gitService').service('gitService', gitService);

})();