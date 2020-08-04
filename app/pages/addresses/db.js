'use strict'

function getAddresses(str) {
  var retrievedObject = localStorage.getItem(str)
  return JSON.parse(retrievedObject)
}

function setAddresses(addresses) {
  // addresses is a stringified object
  localStorage.setItem('addresses', addresses)
}

function addAddress(address) {
  var addresses = JSON.parse(localStorage.getItem('addresses'))
  var added = 
  addresses.push(address)
  setAddresses(JSON.stringify(addresses))
}

emitter.on('addr-init', function() {
  var addresses = getAddresses('addresses')
  emitter.emit('addr-ready', addresses)
})

module.exports = {
  getAddresses: getAddresses,
  setAddresses: setAddresses,
  addAddress: addAddress
}