/**
 * Created by mattiden on 24.02.15.
 */
var response = require('./responses/responses');

module.exports = function(message, socket, connections){
    var username = message.content;
    var usernameExists = false;

    for(var i = 0; i < connections.length; i++){
        if(connections[i].username === username){
            usernameExists = true;
        }
    }
    if(usernameExists){
        socket.send(JSON.stringify(response.usernameExists()));
    }
    if(socket.username !== undefined){
        socket.send(JSON.stringify(response.alreadyLoggedIn()));
    }
    else {
        socket.username = username;
        connections.push(socket);
        socket.send(JSON.stringify(response.successfullyLoggedIn()));
    }
};
