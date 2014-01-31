get-scrapper
===


About
-----

Light GET (HTTP) scrapper that event based to handle Async behaviour of JS.

Usage
-----

```

var client = require("cat");

client.on('error', function (error) {
	console.log("Error : " + error);
});
client.on('failure', function (reason) {
	console.log("Failed : " + reason);
});
client.on('success', function (data) {
	console.log("Success >> " + data);
});

client.setUrl("http://www.example.com")
      .hasNext(function(data) {
        if (data.indexOf("still_has_next") < 0) {
          return false;
        }
        return true;
      })
      .perform();

```
