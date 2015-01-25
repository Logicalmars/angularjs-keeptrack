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
      $scope.isLoaded = false;

      var TracksRes = $resource('http://api.mendlin.info/tracks/:id?expand=entries');
      var trackInfo = TracksRes.get({id: $scope.trackId}, function () {
        //GET api.mendlin.info/tracks/:id
        $scope.track = trackInfo;
        $scope.entries = trackInfo.entries;
        $scope.isLoaded = true;
      });

      var EntryRes = $resource('http://api.mendlin.info/entries/:id');

      function addEntry(timestamp) {
        // Make the timestamp in seconds
        timestamp = Math.floor(timestamp / 1000);

        var entry = new EntryRes();
        entry.track_id = $scope.trackId;
        entry.timestamp = timestamp;
        entry.$save();

        $scope.entries.push(angular.copy(entry));
      }

      $scope.addEntry = function() {
        addEntry(Date.now());
      };

      // Debug only function
      $scope.isDebug = false;
      $scope.addTestEntry = function() {
        for (var d = 1; d < 30; d+=2) {
          addEntry(new Date(2015, 0, d).getTime());
        }
      };

      $scope.day = moment();
    }]);
