(function() {

  'use strict';

  var Q = require('q');
  var _ = require('lodash');
  var handwerk = require('./handwerk');

  var range1000 = _.range(1000);

  function doStuff(item) {
    // random time between 500 and 2500 ms for async simulation
    var time = (Math.random() * 2000) + 500;
    // dostuff needs to return a promise. That's why I use Q library here
    return Q.delay(time);
  }

  handwerk.run(10, range1000, doStuff);

})();
