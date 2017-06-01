let app = angular.module('paging', []);

app.config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
        .when('/',
            {
                templateUrl: 'components/index/index.html',
            })
        .when('/home',
            {
                templateUrl: 'components/home/home.html',
            })
        .when('/app',
            {
                templateUrl: 'components/app/app.html',
            })
        .when('/login',
            {
                templateUrl: 'components/login/login.html',
            })
        .when('/register',
            {
                templateUrl: 'components/register/register.html',
            })
        .otherwise(
            {
                templateUrl: 'components/error/error.html',
            });

    /* TODO: Handle default redirection */
    // .otherwise( {redirectTo: '/'} );
});

app.factory('Search', function() {
    return {
        location: '',
        datetime: '',
        duration: '',
        radius: '',
        type: '',
    };
});
