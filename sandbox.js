var thrift = require('thrift');
var util = require('util');
var Trade = require('./gen-nodejs/trade_types.js').Trade;

var TCompactProtocol = require('thrift/lib/thrift/protocol').TCompactProtocol;
var TFramedTransport = require('thrift/lib/thrift/transport').TFramedTransport;

console.log(util.inspect(newTrade));

var newTrade = new Trade({"fish": "blue", "price": 100000.0});

var transport = new TFramedTransport(null, function (byteArray) {
    console.log(byteArray);
    byteArray = byteArray.slice(4);

    var receivedTrade = new Trade({});

    var deserializationTransport = new TFramedTransport(byteArray);
    var deserializationProtocol = new TCompactProtocol(deserializationTransport);
    receivedTrade.read(deserializationProtocol);
    console.info(receivedTrade);
});


var compactProtocol = new TCompactProtocol(transport);
newTrade.write(compactProtocol);
transport.flush();