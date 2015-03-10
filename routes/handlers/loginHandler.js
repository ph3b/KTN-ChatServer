/**
 * Created by mattiden on 24.02.15.
 */
module.exports = function(message, socket, connections){
    var username = message.content;
    var usernameExists = false;
    for(var i = 0; i < connections.length; i++){
        if(connections[i].username === username){
            usernameExists = true;
        }
    }
    if(usernameExists){
        var response = {
            'timestamp': Date.now(),
            'sender': "server",
            'response': "error",
            'content': "Username already in use"
        };
        socket.send(JSON.stringify(response));
    }
    else {
        socket.username = username;
        connections.push(socket);

        var response = {
            'timestamp': Date.now(),
            'sender': "server",
            'response': "info",
            'content': "Logged in successfully"
        };
        socket.send(JSON.stringify(response));
    }
};
