'use strict';

/**
 * @ngdoc function
 * @name angularjsKeeptrackApp.controller:TrackCtrl
 * @description
 * # TrackCtrl
 * Controller of the angularjsKeeptrackApp
 */
angular.module('angularjsKeeptrackApp')
  .controller('TrackCtrl', ['$scope', '$routeParams', '$resource',
    function ($scope, $routeParams, $resource) {
      $scope.trackId = $routeParams.trackId;

      var TracksRes = $resource('http://api.mendlin.info/tracks/:id?expand=entries');
      var trackInfo = TracksRes.get({id: $scope.trackId}, function () {
        //GET api.mendlin.info/tracks/:id
        console.log(trackInfo);
        $scope.track = trackInfo;
        $scope.entries = trackInfo.entries;
      });

      var EntryRes = $resource('http://api.mendlin.info/entries/:id');
      $scope.addEntry = function() {
        var entry = new EntryRes();
        entry.track_id = $scope.trackId;
        entry.timestamp = Date.now();
        entry.$save();

        $scope.entries.push(angular.copy(entry));
      };
    }]);
