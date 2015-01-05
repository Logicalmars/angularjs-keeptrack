'use strict';

/**
 * @ngdoc function
 * @name angularjsKeeptrackApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularjsKeeptrackApp
 */
angular.module('angularjsKeeptrackApp')
  .controller('MainCtrl', function ($scope) {
    $scope.tracks = ['track1', 'track2', 'track3'];

    $scope.isCreatingTrack = false;
    $scope.startCreatingTrack = function() {
      $scope.isCreatingTrack = true;
    };
    $scope.cancelCreatingTrack = function() {
      $scope.isCreatingTrack = false;
    };

    $scope.addNewTrack = function (newTrack) {
      $scope.tracks.push(newTrack.name);
      newTrack.name = "";
      newTrack.description = "";
    };

  });
