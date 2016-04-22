(function () {

    angular.module('data', []);

    /*  */
    function dataService() {

        this.test = function () {
            return "module: 'data', service: 'dataService', function: 'test'"
        };

        this.setTestArray = function (length, target) {
            target.length = 0;
            var text = "";
            var longTextStartIndex = length - 3;
            for (var i = 0; i < length; i++) {
                var number = Math.random();
                
                if (i > longTextStartIndex) {
                    text = "text field sample " + number + " (" +  i + ") very very very loooong text";
                } else {
                    text = "text field sample " + number + " (" + i + ")";
                }
                var item = { "id": i, "name": text, "number": number};
                target.push(item);
            }
        };

        this.getTestArray = function (length) {
            var target = [];
            this.setTestArray(length, target);
            return target;
        };

        this.sort = function (sortFieldName, target) {
            function srt(a, b) {
                if (a[sortFieldName] > b[sortFieldName]) return 1;
                if (a[sortFieldName] < b[sortFieldName]) return -1;
            }
            target.sort(srt)
        }
    }

    angular.module('data').service('dataService', dataService);

})();