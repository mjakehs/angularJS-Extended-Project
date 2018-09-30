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
    vm.manageTeam = function (project) {
        $mdDialog.show({
            parent: document.getElementById('popupContainer'),
            targetEvent: event.currentTarget,
            template:
                `
                <md-dialog ng-controller="SocialController as vm">
                    <md-dialog-content>
                        <div layout="row">
                            <div flex="30">
                                <p>Current Members</p>
                                <ul>
                                    <li ng-repeat="member in members">{{member.username}} Hours Worked: {{member.sum}}</li>
                                </ul>
                            </div>
                            <md-input-container flex="30">
                                <label>Comrades</label>
                                <md-select ng-model="member.id">
                                    <md-option value="{{friend.id}}" ng-repeat="friend in vm.friends">{{friend.username}}</option>
                                </md-select>
                            </md-input-container>
                            <md-button ng-click="addMember(newMember)">Add Member</md-button>
                         </div>
                    </md-dialog-content>
                    <md-dialog-actions>
                        <md-button ng-click="closeDialog()" class="md-warn md-raised">
                            Leave Project Manager
                        </md-button>
                    </md-dialog-actions>
                </md-dialog>
                `,
            controller: DialogController
        });
        function DialogController($mdDialog, $scope, $http) {
            $scope.newMember = {};
            $scope.members = [];
            $scope.getTeamMembers = function(project) {
                $http({
                    method: 'GET',
                    url: 'projects/team',
                    params: {project_id: project}
                })
                .then( function(response){
                    $scope.members = response.data;
                })
                .catch(function(error) {
                    alert('Error in projects/team GET');
                })
            }
            $scope.getTeamMembers(project);
            $scope.closeDialog = function () {
                $mdDialog.hide();
            }
        }

    }
    vm.getProjects();
}]);