app.controller('ProjectController', ['$http', '$mdDialog', function ($http, $mdDialog) {
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

    vm.deleteProject = function(projectId) {
        $http({
            method: 'DELETE',
            url: '/projects',
            params: {id: projectId}
        })
        .then( function(response){
            vm.getProjects();
        })
        .catch(function(error){
            alert('Error in project delete!');
        })
    }
    
    vm.editProjectName = function(id, name) {
        let confirm = $mdDialog.prompt()
        .title('Edit Project Name')
        .placeholder('Project Name')
        .initialValue(name)
        .targetEvent(event.currentTarget)
        .required(true)
        .ok('Edit')
        .cancel('Cancel');
        $mdDialog.show(confirm).then(function(value) {
            console.log(value);
            name = value;
            $http({
                method: 'PUT',
                url: '/projects',
                data: {name: name},
                params: {id: id}
            })
            .then( function(response){
                vm.getProjects();
            })
            .catch(function(error){
                alert('Error in project update!');
            })
          }, function() {
            console.log('Add alert here?')
          });
    }

    vm.getProjects();
}]);