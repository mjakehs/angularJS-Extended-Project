const app = angular.module('TrackerApp', []);

app.controller('EntryController', ['$http', function($http){
    let vm = this;
    vm.message = 'Hi there!';

    vm.submitEntry = function(entry) {
        console.log(entry);
        $http({
            method: 'POST',
            url: '/entries',
            data: entry
        }).then(function(response){
            console.log(response);
        }).catch(function(error){
            alert('Error in entry post!');
        })
    }//end entry post

    vm.getEntries = function(){
        console.log('Placeholder for get entries');
    }
}])