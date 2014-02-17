(function(){

  /*global mocha,chai,EventEmitter*/
  'use strict';
  var assert = require("chai").assert;
  var Scrap = require("../main.js");
  var nock = require("nock");



  describe("Get Scrapper", function(){

    before(function() {
      var scope = nock('http://yes')
                // .log(console.log)
                .get('/1')
                .reply(200, "data_1 ")
                .get("/2")
                .reply(200, "data_2")
                .get("/3")
                .reply(200, " nope");
    });

    it("should be able to handle data and next", function(){
      var scrap = new Scrap()
      var counter = 1;

      scrap.on("success", function(data){
        assert.equal(data, "data_1 data_2 nope");
      });

      scrap
      .setUrl("http://yes/" + counter)
      .hasNext(function(data) {

        if (data.indexOf("data") < 0) {
          return false;
        }
        counter ++;
        this.url = "http://yes/" + counter;
        return true;
      })
      .perform();

    });

  });


})()




