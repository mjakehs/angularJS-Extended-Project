const app = angular.module('TrackerApp', []);

app.controller('TrackerController', ['$http', function($http){
    let vm = this;
    vm.message = 'Hi there!';

}])