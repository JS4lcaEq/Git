
angular.module('app', []);

(function () {

    function MainCtrl() {
        this.name = "perceptron";
        this.input = [];
        this.angle = 3;
        this.style = { "width": "0", "height": "0" };
        this.addNeyronName = null;
        this.neyrons = [];

        this.setInput = function (angle) {
            var self = this;
            var length = angle * angle;
            self.input.length = 0;
            for (var i = 0 ; i < length; i++) {
                self.input.push({ index: i, value: false });
            }
            self.style.width = (300 / self.angle) + "px";
            self.style.height = (300 / self.angle) + "px";
        };

        this.change = function (item) {
            item.value = !item.value;
        };

        this.addNeyron = function (name) {
            var self = this;
            self.neyrons.push({index: self.neyrons.length, name: name, synapses:[]});
        };
        this.delNeyron = function (item) {
            var self = this;
            self.neyrons.splice(item.index, 1);
            indexer(self.neyrons);
        };

        this.setInput(this.angle);


        function indexer(arr) {
            for (var i = 0; i < arr.length; i++) {
                arr[i].index = i;
            }
        }

        function learn(neyron, input) {
            neyron.synapses.learn = 0;

        }
    }

    angular.module('app').controller('MainCtrl', MainCtrl);

})();

//angular.bootstrap("html", ['app']);



