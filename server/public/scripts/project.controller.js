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
    vm.manageTeam = function (entry) {
        $mdDialog.show({
            parent: document.getElementById('popupContainer'),
            targetEvent: event.currentTarget,
            template:
                `
                <md-dialog ng-controller="EntryController as vm">
                    <md-dialog-content>
                    <h3>Edit Entry<h3>
                    <div layout="row" layout-padding">
                         <md-input-container class="entryInput">
                            <label>Entry</label>
                            <input type="text" ng-model="entryEdit.entry" placeholder="What did you do?" />
                        </md-input-container>
                         <md-input-container class="entryInput">
                            <label>Project</label>
                             <md-select ng-model="entryEdit.project_id">
                                <md-option value="{{project.id}}" ng-repeat="project in vm.projectsList">{{project.name}}</option>
                            </md-select>
                        </md-input-container>
                        <md-input-container class="entryInput">
                            <label>Entry Date</label>
                            <md-datepicker ng-model="entryEdit.date"></md-datepicker>
                        </md-input-container>
                        <md-input-container class="entryInput">
                            <label>Hours</label>
                            <input type="text" ng-model="entryEdit.hours">
                        </md-input-container>
                    </div>
                    </md-dialog-content>
                    <md-dialog-actions>
                        <md-button ng-click="closeDialog()" class="md-warn md-raised">
                            Cancel
                        </md-button>
                        <md-button ng-click="saveEdit(entryEdit.id)" class="md-primary md-raised">
                            Save Edit
                        </md-button>
                    </md-dialog-actions>
                </md-dialog>
                `,
            controller: DialogController
        });
        function DialogController($mdDialog, $scope, $http) {
            $scope.closeDialog = function () {
                $mdDialog.hide();
            }
        }

    }
    vm.getProjects();
}]);