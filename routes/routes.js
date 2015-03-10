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
        'sender': 'server',
        'response': "error",
        'content': "Not logged in. Please log in."
    };

    var welcomeMessage = {
        'timestamp': Date.now(),
        'sender': 'server',
        'response': "info",
        'content': 'Welcome to chat server'
    };
    var invalidCommandMessage = {
        'timestamp': Date.now(),
        'sender': 'server',
        'response': "error",
        'content': 'Please send payload with the following field: request, content. Type help for more.'
    };


    socketConnection.on('connection', function(socket){
        socket.send(JSON.stringify(welcomeMessage));

        socket.on('message', function incoming(req){
            var message = JSON.parse(req);
            if(typeof message.request !== 'undefined'){
                switch(message.request){
                    case 'login':
                        loginHandler(message,socket, connections);
                        break;
                    case 'msg':
                        msgHandler(userIsLoggedIn, socket, notLoggedInError, req, socketConnection);
                        break;
                    case 'logout':
                        logoutHandler(socket, connections, userIsLoggedIn, notLoggedInError);
                        break;
                    case 'names':
                        namesHandler(userIsLoggedIn,connections, socket, notLoggedInError);
                        break;
                    case 'help':
                        helpHandler(socket);
                        break;
                }
            }
            else {
                socket.send(JSON.stringify(invalidCommandMessage));
            }
        });
        socket.on('close', function(){
            connections.splice(connections.indexOf(socket), 1);
        })
    });
};