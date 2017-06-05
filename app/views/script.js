let app = angular.module('paging', ['ui.bootstrap', 'ngRoute', 'angular.filter', 'ngStorage']);

app.config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false,
    });

    $routeProvider
        .when('/',
        {
            templateUrl: '/components/index/index.html',
        })
        .when('/home',
        {
            templateUrl: '/components/home/home.html',
        })
        .when('/app/:foo',
        {
            templateUrl: '/components/app/app.html',
        })
        .when('/login',
        {
            templateUrl: '/components/login/login.html',
        })
        .when('/register',
        {
            templateUrl: '/components/register/register.html',
        })
        .otherwise(
        {
            templateUrl: '/components/error/error.html',
        });

    /* TODO: Handle default redirection */
    // .otherwise( {redirectTo: '/'} );
});

/* Default socket connection/initialisation */
app.controller('indexCtrl', function($scope, socket) {
    socket.on('connect', (data) => {
        socket.join('hello-world');
        socket.broadcast('hello-world', 'messages', 'broadcast');
    });
    socket.on('messages', function(data) {
        console.log('Incoming message:', data);
    });
});
