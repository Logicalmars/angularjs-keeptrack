'use strict';

/**
 * @ngdoc function
 * @name angularjsKeeptrackApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularjsKeeptrackApp
 */
angular.module('angularjsKeeptrackApp')
  .controller('MainCtrl', function ($scope, $resource) {
    $scope.isCreatingTrack = false;
    $scope.startCreatingTrack = function() {
      $scope.isCreatingTrack = true;
    };
    $scope.cancelCreatingTrack = function() {
      $scope.isCreatingTrack = false;
    };

    //Track resources
    var TracksRes = $resource('http://api.mendlin.info/tracks/:id');
    var tracks = TracksRes.query(function () {
      //GET api.mendlin.info/tracks
      console.log(tracks);
      $scope.tracks = tracks;
    });

    $scope.addNewTrack = function (newTrack) {
      var track = new TracksRes(newTrack);
      track.$save();

      $scope.tracks.push(track);

      newTrack.name = "";
      newTrack.description = "";
    };
  });
