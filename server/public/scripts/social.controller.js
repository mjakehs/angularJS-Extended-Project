app.controller('SocialController', ['$http', function ($http) {
    let vm = this;
    vm.friends = [];
    vm.getFriends = function() {
        $http({
            method: 'GET',
            url: '/connections'
        })
        .then( function(response){
            vm.friends = response.data;
        })
        .catch( function(error) {
            alert('Error in friends GET.');
        })
    }
    vm.getCurrentUser = function(){
        $http({
            method: 'GET',
            url: '/api/user'
        })
        .then( function(response){
            vm.currentUser = response.data.username;
        })
        .catch( function(error) {
            alert('Error in current user GET.');
        })
    }

    vm.getCurrentUser();
    vm.getFriends();
}]);