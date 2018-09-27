app.controller('ProjectController', ['$http', function ($http) {
    let vm = this;
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
        console.log('Hi');
    }
}]);