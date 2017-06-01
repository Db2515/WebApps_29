/* */

/* Controller to handle the search bar on the home screen */
app.controller('homeController', function($scope, $filter, $http, $location, Search) {
    $scope.homeSearch = Search;

    /* Initiaalises the following fields to the following default values */
    $scope.homeSearch.location = 'Current Location';
    $scope.homeSearch.datetime = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm');
    $scope.homeSearch.duration = 60;
    $scope.homeSearch.radius = 1000;
    $scope.homeSearch.type = 'museum';

    $scope.submitFields = () => {
        $scope.$broadcast('submit');

        $http.get('/users/search')
            .then(function(response) {
                /* Data is packaged into a nasty JSON format.
                 * To access it first one must retrieve the *.data part to distinguish from header */
                $location.url(response.data.url);
            }, function(response) {
                console.log('Failure when accessing /users/search');
            });
    };
});

/* Issues a get request to check login credentials.
 * Accordingly redirects user to app or login screen */
app.controller('homeRedirect', function($http, $location) {
    $http.get('/users/home')
        .then(function(response) {
            /* Data is packaged into a nasty JSON format.
             * To access it first one must retrieve the *.data part to distinguish from header */
            $location.url(response.data.url);
        }, function(response) {
            console.log('Failure when accessing /users/index');
        });
});