/*global mocha,chai,EventEmitter*/
'use strict';
var util = require("util");
var EventEmitter = require("events").EventEmitter;
var http = require("http");


function Cat () {	

	var self  = this;
	var allData = "";

	//Please make ti private somehow, can be change through setUrl only and accessible by instance only
	// If not possible then make in the constructor not setUrl
	self.url = undefined;
	EventEmitter.call(this);


	function _batchFetch() {
		http.get(
			self.url,
			function(res) {

				var data = '';

				if (res.statusCode != 200) {
					self.emit("error", "Not OK");
				}

				res.on('data', function(chunk) {
					data += chunk;
				});

				res.on("end", function() {

					allData += data;
					if (self.hasNext(data)) {
						_batchFetch();
						return;
					}

					self.emit('success', allData);
					
				});

			})
		.on("error", function(e) {
			console.log("Error " + e);
			self.emit("error", e)
		});
	};

	self.perform = function (){
		_batchFetch();
	};

	self.hasNext = function(cb) {
		// I am not sure if this is good, a method set his own definition
		if (typeof cb === "function") {
			self.hasNext = cb;	
		}
		return this;
	};

	self.setUrl = function (url) {
		self.url = url;
		return this;
	};


}



util.inherits(Cat, EventEmitter);
module.exports = Cat;

