
angular.module('app', ['ngSanitize', 'ngRoute', 'data', 'dropDown']);

(function () {

    function MainCtrl($route, $routeParams, $location, $http, TreeService, dataService) {
        this.name = "test name";
        this.location = $location;
        this.route = $route;
        this.dataService = dataService;
        this.testDataService = [];
        this.model = {};
        this.input = null;
        this.testData = [];
        this.testDataLength = 1000;
        this.sortField = "number";
        this.git = {
            "546aab1fccd3ffa3d1b71c6f8aac975f28b86d12":{
                "HASH":"546aab1fccd3ffa3d1b71c6f8aac975f28b86d12","PARENTS":["8bd3000b7cbf427088d49f9ea270e4da804987e3"],
                "AUTHOR_NAME":"ALEKSEY ZADOINIY","SUBJECT":"2016-04-20","NOTES":"","DATE":"Wed, 20 Apr 2016 13:53:31 +0300"},
            "8bd3000b7cbf427088d49f9ea270e4da804987e3":{
                "HASH":"8bd3000b7cbf427088d49f9ea270e4da804987e3","PARENTS":["46a75cb851ff2a5073a83bc32ba30ffc8e92ebd8", "89e86c9e34e0078a99c61a91f612cc054d7b6051"],
                "AUTHOR_NAME":"ALEKSEY ZADOINIY","SUBJECT":"Merge branch 'new' of https://github.com/lexnekr/gittest","NOTES":"","DATE":"Tue, 19 Apr 2016 14:43:43 +0300"},
            "46a75cb851ff2a5073a83bc32ba30ffc8e92ebd8":{
                "HASH":"46a75cb851ff2a5073a83bc32ba30ffc8e92ebd8","PARENTS":["bc39def9e58be49ad58252d14bf362b264b3ec5b", "94adc3e354412a120fda3084805adebc2c2010a9"],
                "AUTHOR_NAME":"ALEKSEY ZADOINIY","SUBJECT":"Merge branch 'new' of https://github.com/lexnekr/gittest","NOTES":"","DATE":"Tue, 19 Apr 2016 14:39:21 +0300"},
            "bc39def9e58be49ad58252d14bf362b264b3ec5b":{
                "HASH":"bc39def9e58be49ad58252d14bf362b264b3ec5b","PARENTS":["6761cb10aca715574dd0d3ce4e56f3392997f40a", "ad60e40c03c9addaf30d50ebec866bc0902d8feb"],
                "AUTHOR_NAME":"ALEKSEY ZADOINIY","SUBJECT":"Merge branch 'master' of https://github.com/lexnekr/gittest","NOTES":"","DATE":"Tue, 19 Apr 2016 14:29:41 +0300"},
            "6761cb10aca715574dd0d3ce4e56f3392997f40a":{
                "HASH":"6761cb10aca715574dd0d3ce4e56f3392997f40a","PARENTS":["cf5297547bc2f985429cf410c63a40742ec1ea2b"],
                "AUTHOR_NAME":"ALEKSEY ZADOINIY","SUBJECT":"2016-04-19","NOTES":"","DATE":"Tue, 19 Apr 2016 14:25:31 +0300"},
            "ad60e40c03c9addaf30d50ebec866bc0902d8feb":{
                "HASH":"ad60e40c03c9addaf30d50ebec866bc0902d8feb","PARENTS":["cf5297547bc2f985429cf410c63a40742ec1ea2b"],
                "AUTHOR_NAME":"lexnekr","SUBJECT":"README.md","NOTES":"","DATE":"Tue, 19 Apr 2016 14:25:25 +0300"},
            "89e86c9e34e0078a99c61a91f612cc054d7b6051":{
                "HASH":"89e86c9e34e0078a99c61a91f612cc054d7b6051","PARENTS":["94adc3e354412a120fda3084805adebc2c2010a9"],
                "AUTHOR_NAME":"Aleksey Zadoiniy","SUBJECT":"ещё изменения в новой ветке отдельные от основной ветке (где уже есть мердж с новой веткой)","NOTES":"","DATE":"Tue, 19 Apr 2016 14:43:16 +0400"},
            "94adc3e354412a120fda3084805adebc2c2010a9":{
                "HASH":"94adc3e354412a120fda3084805adebc2c2010a9","PARENTS":[],
                "AUTHOR_NAME":"Aleksey Zadoiniy","SUBJECT":"new branch","NOTES":"","DATE":"Tue, 19 Apr 2016 14:36:25 +0400"},
            "cf5297547bc2f985429cf410c63a40742ec1ea2b":{
                "HASH":"cf5297547bc2f985429cf410c63a40742ec1ea2b","PARENTS":["a8f3a60ea02ec086b3826c598eec0ffdcd0df14f"],
                "AUTHOR_NAME":"ALEKSEY ZADOINIY","SUBJECT":"2016-04-15","NOTES":"","DATE":"Fri, 15 Apr 2016 18:15:22 +0300"},
            "a8f3a60ea02ec086b3826c598eec0ffdcd0df14f":{
                "HASH":"a8f3a60ea02ec086b3826c598eec0ffdcd0df14f","PARENTS":[],
                "AUTHOR_NAME":"ALEKSEY ZADOINIY","SUBJECT":"1st commit","NOTES":"","DATE":"Fri, 15 Apr 2016 18:11:51 +0300"}
        };

        this.gitIndex = {};

        this.gitEdges = [];

        console.log(this.tree);

        this.onSelect = function (item) {
            console.log("external onSelect", item);
        };

        this.onInputchange = function (input) {
            console.log("external onInputchange", input);
        };
        
        this.generate = function (length) {
            var self = this;
            //self.testData = null;
            //console.log(length, self.testDataService.length);
            self.testDataService.length = 0;
            self.testDataService = [];
            dataService.setTestArray(length, self.testDataService);
            self.render();
            self.testData = self.testDataService;
        };

        this.sort = function (field) {
            var self = this;
            self.testData = false;
            //self.testData = [];
            //self.testData.length = 0;
            dataService.sort(field, self.testDataService);
            self.render();
            self.testData = self.testDataService;
        };

        this.render = function () {
            var self = this;
            var canvas = document.getElementById("canvas");
            canvas.height = 500;
            canvas.width = 500;
            var ctx = canvas.getContext('2d');
            var k = 500 / self.testDataService.length;
            for (var i = 0; i < self.testDataService.length; i++) {
                var y = self.testDataService[i].number * self.testDataService.length * k;
                ctx.fillRect(i*k, y, 1, 1);
            }
            
        };

        this.setGitIndex = function () {
            var self = this;
            self.gitIndex = null;
            self.gitIndex = {};
            var i = 0;
            for (var key in self.git) {            
                self.gitIndex[key] = i;
                self.gitIndex[key].index = i;
                i++;
            }
        };

        this.setGitEdges = function () {
            var self = this;
            self.gitEdges.length = 0;
            var i = 0;
            for (var key in self.git) {
                var item = self.git[key];
                for (var n = 0; n < item.PARENTS.length; n++) {
                    var parentKey = item.PARENTS[n];
                    console.log(parentKey);
                    self.gitEdges.push([i, self.gitIndex[parentKey]]);
                }
                i++;
            }
        };

        this.setGitIndex();
        this.setGitEdges();

        this.renderGit = function (width, length) {
            var self = this;
            var cnvs = document.getElementById("git");
            console.log(cnvs);
            cnvs.height = width;
            cnvs.width = width;
            var stepWidth = width / length;
            var ctx = cnvs.getContext('2d');
            ctx.font = "bold 12px sans-serif";
            ctx.fillText("git", 20, 20);
            
            for (var i = 0; i < length; i++) {
                for (var n = 0; n < length; n++) {
                    ctx.fillStyle = "#ddd";
                    ctx.fillRect(i * stepWidth, n * stepWidth, stepWidth - 1, stepWidth - 1);
                }
            }
            ctx.fillStyle = "#000";
            ctx.font = "bold 12px sans-serif";
            ctx.fillText("git", 20, 20);
          
        }





        this.renderGit(300, 10);

        this.treeData = [];
        this.treeDataIndex = {};
        this.treeBranches = {};
        this.branchLength = 2;
        this.levelsLength = 2;

        this.treeDataFill = function (baranchLength, levelLengthl) {
            var self = this;
            self.tree.data.length = 0;
            var strt = (new Date).getTime();
            console.log("start " + strt);
            //self.step(baranchLength, levelLengthl, 0, 0);
            self.tree.createTestData(baranchLength, levelLengthl);
            console.log("items compleet " + ((new Date).getTime() - strt));
            self.tree.setIndex();
            console.log("index compleet " + ((new Date).getTime() - strt));
            self.tree.setBranches();
            console.log("branches compleet " + ((new Date).getTime() - strt));
            self.tree.setDisplayBranches(0, 10);

        };



        this.treeOpen = function (id) {
            var self = this;
            //alert(id);
            self.tree.openBranch(id);
        };




    }

    angular.module('app').controller('MainCtrl', MainCtrl);

})();

//angular.bootstrap("html", ['app']);



