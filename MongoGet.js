
var http = require('http');
var http_port = 8888;

var MongoClient = require('mongodb').MongoClient;
var Mongo_URI = "mongodb://localhost:27017/";
var Db_Name = "tlsmsdb_test";

http.createServer(function (req, resp)
{ 
    resp.setHeader('Content-Type', 'application/json');
    resp.writeHead(200, {'Access-Control-Allow-Origin': '*'} );

    MongoClient.connect(Mongo_URI, function(err, db)
    {
        if (err) throw err;

        var dbo = db.db(Db_Name);
        dbo.collection(req.url.substr(1)).find({}).toArray(function(err, result)
        {
            if (err) throw err;

            resp.end(JSON.stringify(result));
            db.close();
        });
    });

}).listen(http_port);
