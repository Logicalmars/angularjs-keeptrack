'use strict';

/**
 * @ngdoc function
 * @name angularjsKeeptrackApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the angularjsKeeptrackApp
 */
angular.module('angularjsKeeptrackApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
