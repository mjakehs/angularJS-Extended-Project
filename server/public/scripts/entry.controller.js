app.controller('EntryController', ['$http', '$mdDialog', '$scope', function ($http, $mdDialog, $scope) {
    let vm = this;
    vm.entries = [];
    vm.projectsList = [];
    vm.submitEntry = function (entry) {
        vm.formatDateObject(entry);
        vm.getDuplicateEntries();
        if (vm.duplicates) {
            let confirm = $mdDialog.confirm()
                .title('Warning entry with that name for that project exists?')
                .textContent('You may add this duplicate entry if you so choose.')
                .targetEvent(event.currentTarget)
                .ok('Add entry anyways')
                .cancel('Cancel');
            $mdDialog.show(confirm).then(function (value) {
                $http({
                    method: 'POST',
                    url: '/entries',
                    data: entry
                }).then(function (response) {
                    vm.newEntry = {};
                    vm.getEntries();
                }).catch(function (error) {
                    alert('Error in entry post!');
                })
            }, function () {
                console.log('Add alert here?')
            });
        }
        else {
            $http({
                method: 'POST',
                url: '/entries',
                data: entry
            }).then(function (response) {
                vm.newEntry = {};
                vm.getEntries();
            }).catch(function (error) {
                alert('Error in entry post!');
            })
        }
    }//end entry post

    vm.deleteEntry = function (entryId) {
        $http({
            method: 'DELETE',
            url: '/entries',
            params: { id: entryId }
        })
            .then(function (response) {
                vm.getEntries();
            })
            .catch(function (error) {
                alert('Error in entry delete!');
            })
    }

    vm.getEntries = function () {
        $http.get('/entries')
            .then(function (response) {
                vm.entries = response.data;
            }).catch(function (error) {
                alert('Error in entry get!');
            })
    }

    vm.editEntry = function (entry) {
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

            $scope.entryEdit = {};
            $scope.entryEdit.entry = entry.entry;
            $scope.entryEdit.project_id = entry.project_id;
            $scope.entryEdit.date = entry.entry_date;
            $scope.entryEdit.hours = entry.hours;
            $scope.entryEdit.id = entry.id
            $scope.closeDialog = function () {
                $mdDialog.hide();
            }
            $scope.saveEdit = function (entryId) {
                console.log($scope.entryEdit);
                $http({
                    method: 'PUT',
                    url: '/entries',
                    data: $scope.entryEdit,
                    params: { id: entryId }
                })
                    .then(function (response) {
                        console.log(response);
                        vm.getEntries();
                        $mdDialog.hide();
                    })
                    .catch(function (error) {
                        alert('Error in entry update!');
                    })
            }
        }

    }

    /** Stores project start and end times as milliseconds from 1970
     * So that time comparison can be more dynamic  **/
    vm.formatDateObject = function (entry) {
        let start = entry.startTime;
        let end = entry.endTime;
        let entryDate = entry.date;
        let endDate;
        let startDate = new Date(
            (entryDate.getYear() + 1900),
            entryDate.getMonth(),
            entryDate.getDate(),
            start.getHours(),
            start.getMinutes()
        )
        //conditional allows users to rollover to next day if work extends overnight
        if (end.getTime() > start.getTime()) {
            endDate = new Date(
                (entryDate.getYear() + 1900),
                entryDate.getMonth(),
                entryDate.getDate(),
                end.getHours(),
                end.getMinutes()
            )
        }
        if (end.getTime() < start.getTime()) {
            endDate = new Date(
                (entryDate.getYear() + 1900),
                entryDate.getMonth(),
                entryDate.getDate() + 1,
                end.getHours(),
                end.getMinutes()
            )
        }
        vm.newEntry.hours = ((endDate.getTime() - startDate.getTime()) / 3600000).toFixed(2);
    }//end formatDateObject
    vm.getProjectsList = function () {
        console.log('in get projects list');
        $http({
            method: 'GET',
            url: '/projects'
        }).then(function (response) {
            vm.projectsList = response.data;
        }).catch(function (error) {
            alert('Error in project get!');
        })
    }

    vm.getDuplicateEntries = function () {
        $http({
            method: 'GET',
            url: '/entries/duplicate',
            params: {
                project_id: vm.newEntry.project_id,
                entry: vm.newEntry.entry
            }
        })
            .then(function (response) {
                console.log(response.data);
                vm.duplicates = response.data.bool;
            }).catch(function (error) {
                alert('Error in project get!');
            })
    }


    vm.getEntries();
    vm.getProjectsList();
}])