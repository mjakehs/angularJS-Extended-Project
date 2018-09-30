app.controller('SocialController', ['$http', '$mdDialog', function ($http, $mdDialog) {
    let vm = this;
    vm.friends = [];
    vm.users = [];

    vm.getUsers = function () {
        $http({
            method: 'GET',
            url: '/api/user/all'
        })
            .then(function (response) {
                vm.users = response.data;
            })
            .catch(function (error) {
                alert('Error in users GET.');
            })
    }

    vm.getFriends = function () {
        $http({
            method: 'GET',
            url: '/connections'
        })
            .then(function (response) {
                vm.friends = response.data;
            })
            .catch(function (error) {
                alert('Error in friends GET.');
            })
    }
    vm.getCurrentUser = function () {
        $http({
            method: 'GET',
            url: '/api/user'
        })
            .then(function (response) {
                vm.currentUser = response.data.username;
            })
            .catch(function (error) {
                alert('Error in current user GET.');
            })
    }
    vm.getSentMessages = function () {
        $http({
            method: 'GET',
            url: '/messages/sent'
        })
            .then(function (response) {
                vm.sentMessages = response.data;
            })
            .catch(function (error) {
                alert('Error in messages/sent GET.');
            })
    }

    vm.getReceivedMessages = function () {
        $http({
            method: 'GET',
            url: '/messages/received'
        })
            .then(function (response) {
                vm.receivedMessages = response.data;
            })
            .catch(function (error) {
                alert('Error in messages/received GET.');
            })
    }
    vm.addConnectionRequest = function (_id) {
        $http({
            method: 'POST',
            url: '/connections/request',
            data: { id: _id.user }
        })
            .then(function (response) {
                alert('Connection Request Sent');
            })
            .catch(function (error) {
                alert('Error in connection_request POST.');
            })
    }

    vm.getReceivedRequests = function () {
        $http({
            method: 'GET',
            url: 'connections/request/received'
        })
            .then(function (response) {
                vm.receivedRequests = response.data;
            })
            .catch(function (error) {
                alert('Error in connection_request_received GET.');
            })
    }

    vm.getSentRequests = function () {
        $http({
            method: 'GET',
            url: 'connections/request/sent'
        })
            .then(function (response) {
                vm.sentRequests = response.data;
            })
            .catch(function (error) {
                alert('Error in connection_request_sent GET.');
            })
    }

    vm.acceptRequest = function (_id) {
        console.log(_id);
        $http({
            method: 'POST',
            url: '/connections',
            data: { id: _id }
        })
            .then(function (response) {
                alert('Request Accepted');
                console.log(_id);
                $http({
                    method: 'DELETE',
                    url: '/connections/request/received',
                    params: { id: _id }
                })
                    .then(function () {
                        vm.getReceivedRequests();
                        vm.getFriends();
                    })
                    .catch(function (error) {
                        alert('Error in connection_request DELETE.');
                    })
            })
            .catch(function (error) {
                alert('Error in connection POST.');
            })
    }

    vm.cancelRequest = function (_id) {
        console.log(_id);
        $http({
            method: 'DELETE',
            url: '/connections/request/sent',
            params: { id: _id }
        })
            .then(function () {
                vm.getSentRequests();
            }).catch(function (error) {
                alert('Error in connection_request DELETE.');
            })
    }

    vm.sendMessage = function (_id) {
        console.log(_id);
        let confirm = $mdDialog.prompt()
            .title('Send Message')
            .placeholder('Message')
            .targetEvent(event.currentTarget)
            .required(true)
            .ok('Send')
            .cancel('Cancel');
        $mdDialog.show(confirm).then(function (value) {
            let message = value;
            $http({
                method: 'POST',
                url: '/messages',
                data: {message: message,
                id: _id}
            })
            .then(function () {
                vm.getSentMessages();
                vm.getReceivedMessages();
            }).catch(function (error) {
                alert('Error in message POST.');
            })
        })
    }
    vm.deleteConnection = function(_id) {
        $http({
            method: 'DELETE',
            url: '/connections',
            params: {id: _id}
        })
        .then(function () {
            vm.getFriends();
        })
        .catch(function (error) {
            alert('Error in connections DELETE.');
        })
    }

    vm.getSentRequests();
    vm.getReceivedRequests();
    vm.getReceivedMessages();
    vm.getSentMessages();
    vm.getCurrentUser();
    vm.getFriends();
    vm.getUsers();
}]);