/**
 * Created by mattiden on 23.02.15.
 */
var wsServer = require('ws').Server;
var port = 2337;
var socketConnection = new wsServer({port: port});
var router = require('./routes/routes');

// Set up routes
router(socketConnection);
console.log("Socket server running on port: " + port);

