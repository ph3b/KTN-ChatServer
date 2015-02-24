/**
 * Created by mattiden on 24.02.15.
 */
var loginHandler = require('./handlers/loginHandler');
var msgHandler = require('./handlers/msgHandler');
var namesHandler = require('./handlers/namesHandler');
var helpHandler = require('./handlers/helpHandler');
var logoutHandler = require('./handlers/logoutHandler');


var userIsLoggedIn = function(user){
    return typeof user.username !== 'undefined';
};

module.exports = function(socketConnection){
    var connections = [];

    var notLoggedInError = {
        'timestamp': Date.now(),
        'sender': 'Not logged in',
        'response': "error",
        'content': "Not logged in. Please log in."
    };

    socketConnection.on('connection', function(socket){
        socket.send('Welcome to chat server');

        socket.on('message', function incoming(req){
            var message = JSON.parse(req);
            if(typeof message.request !== 'undefined'){
                switch(message.request){
                    case 'login':
                        loginHandler(message,socket, connections);
                        break;
                    case 'msg':
                        msgHandler(userIsLoggedIn, socket, notLoggedInError);
                        break;
                    case 'logout':
                        logoutHandler(socket, connections);
                        break;
                    case 'names':
                        namesHandler(userIsLoggedIn,connections, socket, notLoggedInError);
                        break;
                    case 'help':
                        helpHandler(socket);
                        break;
                }
            }
        });
        socket.on('close', function(){
            connections.splice(connections.indexOf(socket), 1);
        })
    });
};