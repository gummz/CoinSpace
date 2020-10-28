'use strict';

var Ractive = require('lib/ractive')
var emitter = require('lib/emitter')
var toUnitString = require('lib/convert').toUnitString
var getTokenNetwork = require('lib/token').getTokenNetwork;
var getWallet = require('lib/wallet').getWallet
var strftime = require('strftime')
var showAddressDetail = require('widgets/modals/address-detail')
var getAddresses = require('./db').getAddresses

module.exports = function(el){
  var network = getTokenNetwork();
  var ractive = new Ractive({
    el: el,
    template: require('./index.ract'),
    data: {
      addresses: [],
      toUnitString: toUnitString,
      loadingAddr: true,
    }
  })

  emitter.on('append-addresses', function(newAddrs){
    newAddrs.forEach(function(addr) {
      ractive.unshift('addresses', addr);
    })
    ractive.set('loadingAddr', false)
  })

  emitter.on('load-addresses', function(str) {
    var addresses = getAddresses(str)
    ractive.set('addresses', addresses)
    ractive.set('loadingAddr', false)
  })

  ractive.on('show-detail', function(context) {
    var index = context.node.getAttribute('data-index')
    var data = {
      address: ractive.get('addresses')[index],
    }
    showAddressDetail(data)
  })

  return ractive
}
