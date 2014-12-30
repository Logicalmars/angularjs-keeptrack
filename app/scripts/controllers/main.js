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
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
