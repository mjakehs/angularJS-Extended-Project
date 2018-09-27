const app = angular.module('TrackerApp', []);

app.controller('EntryController', ['$http', function ($http) {
    let vm = this;
    vm.message = 'Hi there!';

    vm.submitEntry = function (entry) {
        vm.formatDateObject(entry);
        $http({
            method: 'POST',
            url: '/entries',
            data: entry
        }).then(function(response){
            console.log(response);
            vm.newEntry = {};
        }).catch(function(error){
            alert('Error in entry post!');
        })
    }//end entry post

    vm.getEntries = function () {
        console.log('Placeholder for get entries');
    }

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
        if (end.getTime() < start.getTime()) {
            endDate = new Date(
                (entryDate.getYear() + 1900),
                entryDate.getMonth(),
                entryDate.getDate(),
                end.getHours(),
                end.getMinutes()
            )
        }
        else {
            endDate = new Date(
                (entryDate.getYear() + 1900),
                entryDate.getMonth(),
                entryDate.getDate() + 1,
                end.getHours(),
                end.getMinutes()
            )
        }
        vm.newEntry.startTime = startDate.getTime();
        vm.newEntry.endTime = endDate.getTime();
    }
}])