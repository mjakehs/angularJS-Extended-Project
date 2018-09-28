app.component("exceptionChart", {
    template: `<div><canvas></canvas></div>`,
})
app.controller('ReportController', ['$http', function ($http) {
    let vm = this;
    vm.projects = [];

    vm.getProjects = function () {
        $http({
            method: 'GET',
            url: '/projects'
        }).then(function (response) {
            vm.projects = response.data;
            vm.makeChart();
        }).catch(function (error) {
            alert('Error in project get!');
        })
    }

    vm.filterChart = function(range) {
        console.log(range, 'in filter');
        $http({
            method: 'GET',
            url: '/projects/filter',
            params: {startDate: range.startDate,
            endDate: range.endDate}
        })
        .then( function(response){
            console.log(response);
            vm.projects = response.data;
            vm.makeChart();
        })
        .catch(function(error){
            console.log(error);
            alert('Error in filterChart');
        })
    }  
    
    vm.makeChart = function() {
        vm.names = [];
        vm.costs = [];
        for (project of vm.projects) {
            if(project.total_hours != null) {
                vm.names.push(project.name)
                vm.costs.push(project.total_hours)
            }
        }
        var ctx = document.getElementsByTagName('canvas')[0];
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: vm.names,
                datasets: [{
                    label: 'Total Hours Spent',
                    data: vm.costs,
                    backgroundColor:'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 0.2)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        })
    }

    vm.getProjects();
}]);
