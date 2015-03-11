var thrift = require('thrift');
var util = require('util');
var Trade = require('./gen-nodejs/trade_types.js').Trade;

var TBinaryProtocol  = require('thrift/lib/thrift/protocol').TBinaryProtocol;
var TFramedTransport = require('thrift/lib/thrift/transport').TFramedTransport;

console.log(util.inspect(newTrade));

var newTrade = new Trade({"fish": "blue", "price": 100000.0});

var transport = new TFramedTransport(null, function (byteArray) {
    console.log(byteArray);
    byteArray = byteArray.slice(4);

    var receivedTrade = new Trade({});

    var deserializationTransport = new TFramedTransport(byteArray);
    var deserializationProtocol = new TBinaryProtocol(deserializationTransport);
    receivedTrade.read(deserializationProtocol);
    console.info(receivedTrade);
});


var compactProtocol = new TBinaryProtocol(transport);
newTrade.write(compactProtocol);
transport.flush();
