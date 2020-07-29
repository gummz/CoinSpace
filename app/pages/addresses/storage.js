'use strict'

var retrieve = function(str) {
  var retrievedObject = localStorage.getItem(str)
  return JSON.parse(retrievedObject)
}

module.exports = retrieve