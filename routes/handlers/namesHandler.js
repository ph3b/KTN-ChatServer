/**
 * Created by mattiden on 24.02.15.
 */
module.exports = function(userIsLoggedIn, connections, socket, notLoggedInError){
    if(userIsLoggedIn(socket)){
        var usernames = [];
        for(var i = 0; i < connections.length; i++){
            usernames.push(connections[i].username);
        }
        var response = {
            'timestamp': Date.now(),
            'sender': 'server',
            'response': "info",
            'content': usernames
        };
        socket.send(JSON.stringify(response));
    }
    else {
        socket.send(JSON.stringify(notLoggedInError));
    }
};