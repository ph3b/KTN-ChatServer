/**
 * Created by mattiden on 24.02.15.
 */
module.exports = function(socket, connections, userIsLoggedIn, notLoggedInError){
    if(userIsLoggedIn(socket)){
        connections.splice(connections.indexOf(socket), 1);
        var response = {
            'timestamp': Date.now(),
            'sender': "server",
            'response': "info",
            'content': "Logged out successfully"
        };
        socket.send(JSON.stringify(response));
    } else {
        socket.send(JSON.stringify(notLoggedInError()));
    }




};