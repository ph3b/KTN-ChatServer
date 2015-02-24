/**
 * Created by mattiden on 24.02.15.
 */
module.exports = function(userIsLoggedIn, socket, notLoggedInError){
    if(userIsLoggedIn(socket)){
        var response = {
            'timestamp': Date.now(),
            'sender': socket.username,
            'response': "info",
            'content': "Message sent"
        };
        socket.send(JSON.stringify(response));
    }
    else {
        socket.send(JSON.stringify(notLoggedInError));
    }
};