/**
 * Created by mattiden on 24.02.15.
 */
var response = require('./responses/responses');

module.exports = function(socket, connections, userIsLoggedIn, notLoggedInError){
    if(userIsLoggedIn(socket)){
        delete socket.username;

        socket.send(JSON.stringify(response.loggedOutSuccessfully()));
    } else {
        socket.send(JSON.stringify(notLoggedInError()));
    }
};