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
  var network = getTokenNetwork();

  var ractive = new Ractive({
    el: el,
    template: require('./index.ract'),
    data: {
      votes: [],
      selectedVote: -1,
      feeUnspents: [],
      loadingTx: true,
      validating: false,
    }
  })

  emitter.on('prefill-wallet', function(address, context) {
    if (context !== 'send') return;
    ractive.set('to', address)
  })

  emitter.on('set-transactions', function(txs) {
    var votes = [];
    var fees = [];

    txs.forEach(function(tx) {
      tx.outs.forEach(function(output, vout) {
        if (getWallet().addresses.includes(output.address)) {
          if (tx.ins[0].sequence == 178) {
            votes.push({
              address: output.address,
              amount: output.amount/1e8,
              txid: tx.id,
              vout: vout
            });
          }

          else if (output.amount >= 1e8) {
            fees.push({
              address: output.address,
              amount: output.amount/1e8,
              txid: tx.id,
              vout: vout
            });
          }
        }
      });
    });

    network = getTokenNetwork();
    ractive.set('feeUnspents', fees);
    ractive.set('votes', votes);
    ractive.set('loadingTx', false);
  })

  emitter.on('sync', function() {
    ractive.set('transactions', [])
    ractive.set('loadingTx', true)
  })

  ractive.on('open-vote', function() {
    console.log("now we are going to vote!")

    var wallet = getWallet();
    console.log(ractive.get('votes'));
    console.log(wallet.addresses);

    console.log(wallet.unspents);
  })

  return ractive
}
