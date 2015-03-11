/**
 * Created by mattiden on 24.02.15.
 */
module.exports = function(userIsLoggedIn, socket, notLoggedInError, req, socketConnection){
    if(userIsLoggedIn(socket)){
        var request = JSON.parse(req);
        var message = {
            'timestamp': Date.now(),
            'sender': socket.username,
            'response': "info",
            'content': request.content
        };
        socketConnection.clients.forEach(function(client){
            client.send(JSON.stringify(message));
        })
    }
    else {
        socket.send(JSON.stringify(notLoggedInError()));
    }
};