'use strict'

function getAddresses(str) {
  var retrievedObject = localStorage.getItem(str)
  return JSON.parse(retrievedObject)
}

function setAddresses(addresses) {
  localStorage.setItem('addresses', addresses)
}

function addAddress(address) {
  var addresses = JSON.parse(localStorage.getItem('addresses'))
  addresses.push(address)
  setAddresses(JSON.stringify(addresses))
}

module.exports = {
  getAddresses: getAddresses,
  setAddresses: setAddresses,
  addAddress: addAddress
}