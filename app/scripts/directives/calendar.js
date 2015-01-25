'use strict';

/**
 * @ngdoc function
 * @name angularjsKeeptrackApp.directive.calendar
 * @description
 * Directive for Calendar view
 */
angular.module('angularjsKeeptrackApp')
  .directive('calendar', function() {
    return {
      restrict: "E",
      templateUrl: "views/calendar.html",
      scope: {
        selected: "=",
        entries: "="
      },
      link: function(scope) {
        //Only load the calendar when the entries data is ready.
        scope.$watch('entries', function(entries) {
          scope.dates = [];
          angular.forEach(scope.entries, function(entry) {
            scope.dates.push(new Date(entry.timestamp * 1000));
          });

          _renderCalendar(scope);
        });
      }
      };

      function _renderCalendar(scope) {
        scope.selected = _removeTime(scope.selected || moment());
        scope.month = scope.selected.clone();

        var start = scope.selected.clone();
        start.date(1);
        _removeTime(start.day(0));

        _buildMonth(scope, start, scope.month);

        scope.select = function(day) {
          scope.selected = day.date;
        };

        scope.next = function() {
          var next = scope.month.clone();
          _removeTime(next.month(next.month()+1)).date(1);
          scope.month.month(scope.month.month()+1);
          _buildMonth(scope, next, scope.month);
        };

        scope.previous = function() {
          var previous = scope.month.clone();
          _removeTime(previous.month(previous.month()-1).date(1));
          scope.month.month(scope.month.month()-1);
          _buildMonth(scope, previous, scope.month);
        };
      }

      function _removeTime(date) {
        return date.day(0).hour(0).minute(0).second(0).millisecond(0);
      }

      function _buildMonth(scope, start, month) {
        scope.weeks = [];

        var done = false, date = start.clone(), monthIndex = date.month(), count = 0;
        while (!done) {
          scope.weeks.push({ days: _buildWeek(scope, date.clone(), month) });
          date.add(1, "w");
          done = count++ > 2 && monthIndex !== date.month();
          monthIndex = date.month();
        }
      }

      function _buildWeek(scope, date, month) {
        var days = [];
        for (var i = 0; i < 7; i++) {
          days.push({
            name: date.format("dd").substring(0, 1),
            number: date.date(),
            isCurrentMonth: date.month() === month.month(),
            isToday: date.isSame(new Date(), "day"),
            isMarked: _isMarked(scope.dates, date),
            date: date
          });
          date = date.clone();
          date.add(1, "d");
        }
        return days;
      }

      function _isMarked(dates, date) {
        var found = false;
        angular.forEach(dates, function(d) {
          if (date.isSame(d, "day")) {
            found = true;
          }
        });
        return found;
      }
    });

