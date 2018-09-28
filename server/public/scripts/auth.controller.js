app.controller('AuthController', ['$http', '$location', '$scope', function ($http, $location, $scope) {
    let vm = this;
    vm.message = "hey";
    vm.logOut = function () {
        $http({
            method: 'GET',
            url: '/api/user/logout'
        }).then(function (response) {
            console.log(response);
            $location.path('/#!/');
        }).catch(function (error) {
            alert('Error in Log Out!');
        })
    }
    vm.logIn = function (userInfo) {
        console.log('in login');
        $http({
            method: 'POST',
            url: '/api/user/login',
            data: userInfo
        })
        .then(function(){
            $location.path('/#!/entry');
        })
        .catch( function(error) {
            alert('Error logging in user.')
        })
    }

    vm.registerUser = function (userInfo) {
        console.log('in register');
        if (userInfo.password === user.info.confirmPassword){
            $http({
                method: 'POST',
                url: '/api/user/register',
                data: {
                    username: userInfo.username,
                    password: userInfo.password
                }
            })
            .then(function(){
                vm.logIn({
                    username: userInfo.username,
                    password: userInfo.password
                });
            })
            .catch( function(error) {
                alert('Error registering user.')
            })
        } else {
            alert('Passwords must match.')
        }
    }

}]);