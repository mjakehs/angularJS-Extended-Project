app.controller('EntryController', ['$http', function ($http) {
    let vm = this;
    vm.entries = [];

    vm.submitEntry = function (entry) {
        vm.formatDateObject(entry);
        $http({
            method: 'POST',
            url: '/entries',
            data: entry
        }).then(function(response){
            vm.newEntry = {};
            vm.getEntries();
        }).catch(function(error){
            alert('Error in entry post!');
        })
    }//end entry post

    vm.deleteEntry = function(entryId) {
        $http({
            method: 'DELETE',
            url: '/entries',
            params: {id: entryId}
        })
        .then( function(response){
            vm.getEntries();
        })
        .catch(function(error){
            alert('Error in entry delete!');
        })
    }


    vm.getEntries = function () {
        $http.get('/entries')
        .then( function(response){
            vm.entries = response.data;
        }).catch(function(error){
            alert('Error in entry post!');
        })
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
        vm.newEntry.hours = ((endDate.getTime() - startDate.getTime())/3600000)
    }//end formatDateObject

    vm.getEntries();
}])