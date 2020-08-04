'use strict';

var Ractive = require('lib/ractive')
var emitter = require('lib/emitter')
var toUnitString = require('lib/convert').toUnitString
var getTokenNetwork = require('lib/token').getTokenNetwork;
var getWallet = require('lib/wallet').getWallet
var strftime = require('strftime')
var showAddressDetail = require('widgets/modals/address-detail')

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

  emitter.on('append-transactions', function(newTxs){
    newTxs.forEach(function(tx) {
      ractive.unshift('transactions', tx);
    })
    ractive.set('loadingAddr', false)
  })

  emitter.on('set-addresses', function(addresses) {
    network = getTokenNetwork();
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
