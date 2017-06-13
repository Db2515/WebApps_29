let app = angular.module('paging', ['ui.bootstrap', 'ngRoute', 'angular.filter', 'ngStorage', 'ngMap']);

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
                    controller: 'homeCtrl',
                })
        .when('/app/:room',
                {
                    templateUrl: '/components/app/app.html',
                    controller: 'appCtrl',
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

app.factory('Data', function($localStorage) {
    let username = '';
    if ($localStorage.username) {
        username = $localStorage.username;
    }
    return {
        query: {
            location: '',
            datetime: '',
            duration: 60,
            radius: 1000,
            selectedTypes: [],
        },
        types: [
            {
                name: 'Amusement Park',
                image: '../../assets/images/types/amusement_park.png',
                isSelected: false,
            },
            {
                name: 'Art Gallery',
                image: '../../assets/images/types/art_gallery.png',
                isSelected: false,
            },
            {
                name: 'Museum',
                image: '../../assets/images/types/museum.png',
                isSelected: false,
            },
            {
                name: 'Aquarium',
                image: '../../assets/images/types/aquarium.png',
                isSelected: false,
            },
            {
                name: 'Bar',
                image: '../../assets/images/types/bar.png',
                isSelected: false,
            },
            {
                name: 'Cafe',
                image: '../../assets/images/types/cafe.png',
                isSelected: false,
            },
            {
                name: 'Bowling Alley',
                image: '../../assets/images/types/bowling.png',
                isSelected: false,
            },
            {
                name: 'Casino',
                image: '../../assets/images/types/casino.png',
                isSelected: false,
            },
            {
                name: 'Zoo',
                image: '../../assets/images/types/zoo.png',
                isSelected: false,
            },
            {
                name: 'Night Club',
                image: '../../assets/images/types/night_club.png',
                isSelected: false,
            },
            {
                name: 'Shopping Mall',
                image: '../../assets/images/types/mall.png',
                isSelected: false,
            },
            {
                name: 'Restaurant',
                image: '../../assets/images/types/restaurant.png',
                isSelected: false,
            },
            {
                name: 'Gym',
                image: '../../assets/images/types/gym.png',
                isSelected: false,
            },
            {
                name: 'Movie Theater',
                image: '../../assets/images/types/cinema.png',
                isSelected: false,
            },
            {
                name: 'Park',
                image: '../../assets/images/types/park.png',
                isSelected: false,
            },
            {
                name: 'Spa',
                image: '../../assets/images/types/spa.png',
                isSelected: false,
            },
            {
                name: 'Bakery',
                image: '../../assets/images/types/bakery.png',
                isSelected: false,
            },
            {
                name: 'Library',
                image: '../../assets/images/types/library.png',
                isSelected: false,
            },
        ],
        user: {
            username: username,
        },
    };
});

/* Default socket connection/initialisation */
app.controller('ioCtrl', function($scope, socket) {
    socket.on('connect', (data) => {
        // socket.join('default');
        // socket.broadcast('default', 'messages', 'broadcast');
    });
    socket.on('messages', function(data) {
        console.log('Incoming message:', data);
    });
});
