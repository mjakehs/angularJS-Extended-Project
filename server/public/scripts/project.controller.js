app.controller('ProjectController', ['$http', function ($http) {
    let vm = this;
    vm.projects = [];

    vm.addProject = function(project){
        $http({
            method: 'POST',
            url: '/projects',
            data: project
        }).then(function(response){
            vm.newProject = {};
            vm.getProjects();
        }).catch(function(error){
            alert('Error in project post!');
        })
    }
    
    vm.getProjects = function(){
        $http({
            method: 'GET',
            url: '/projects'
        }).then(function(response){
           vm.projects = response.data;
        }).catch(function(error){
            alert('Error in project get!');
        })
    }

    vm.getProjects();
}]);