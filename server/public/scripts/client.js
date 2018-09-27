const app = angular.module('TrackerApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/', {
        templateUrl: './views/home.html'
    }) .when('/entry', {
        templateUrl: './views/entry.html',
        controller: 'EntryController as vm'
    }).when('/project', {
        templateUrl: './views/project.html',
        controller: 'ProjectController as vm'
    }).when('/report', {
        templateUrl: './views/report.html',
        controller: 'ReportController as vm'
    }).otherwise({
        template: '<h1>404 Error</h1>'
    })
}])
