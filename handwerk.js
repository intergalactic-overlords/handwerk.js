(function() {

  'use strict';
  var _ = require('lodash');

  // public function
  function run(numTasks, tArray, taskFunction) {

    // setup
    var counter = [];
    var numberOfTasks = numTasks;
    var tasksArray = tArray;
    var task = taskFunction; // needs to return a promise

    // add push watcher to counter array
    Object.defineProperty(counter, 'push', {
      enumerable: false,
      value: function () {
        watchCounterPush();
        return Array.prototype.push.apply(this, arguments);
      }
    });
    // add splice watcher to counter array
    Object.defineProperty(counter, 'splice', {
      enumerable: false,
      value: function () {
        watchCounterSplice();
        return Array.prototype.splice.apply(this, arguments);
      }
    });

    // start running tasks
    addToCounter(numberOfTasks, tasksArray);

    // fill the counter array with its maximum number of tasks
    // add a unique id to each task
    function addToCounter(numberOfTasks, tasksArray) {
      if (counter.length < numberOfTasks && tasksArray.length) {
        var taskId = _.uniqueId('task_');
        var spliceOfRange = tasksArray.splice(0, 1);
        var tracker = {
          'id': taskId,
          'data': spliceOfRange
        };
        counter.push(tracker);
        addToCounter(numberOfTasks, tasksArray);
      }
    }

    // eventwatchers
    // event when something is removed from counter
    function watchCounterSplice() {
      addToCounter(10, tasksArray);
    }

    // event when something is added to counter
    function watchCounterPush() {
      var lastItemIndex = counter.length - 1;
      var item = counter[lastItemIndex];
      task(item).then(function () {
        var ids = _.pluck(counter, 'id');
        var index = _.indexOf(ids, item.id);
        console.log(counter[index]);
        console.log('splice from counter, index: ' + index);
        counter.splice(index, 1);
      });

    }
  }

  exports.run = run;

}.call(this));