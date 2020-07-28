'use strict';

var Ractive = require('lib/ractive');
var Big = require('big.js');
var emitter = require('lib/emitter');
var db = require('lib/db');
var getWallet = require('lib/wallet').getWallet;
var getTokenNetwork = require('lib/token').getTokenNetwork;
var showError = require('widgets/modals/flash').showError;
var showInfo = require('widgets/modals/flash').showInfo;
var showConfirmation = require('widgets/modals/confirm-send');
var showTooltip = require('widgets/modals/tooltip');
var validateSend = require('lib/wallet').validateSend;
var getDynamicFees = require('lib/wallet').getDynamicFees;
var resolveTo = require('lib/openalias/xhr.js').resolveTo;
var qrcode = require('lib/qrcode');
var bchaddr = require('bchaddrjs');


module.exports = function(el){
  var selectedFiat = '';
  var defaultFiat = 'USD';

  var ractive = new Ractive({
    el: el,
    template: require('./index.ract'),
    data: {
      gasLimit: ''
    }
  })

  emitter.on('prefill-wallet', function(address, context) {
    if (context !== 'send') return;
    ractive.set('to', address)
  })

  return ractive
}
