/**
 * Created by mattiden on 24.02.15.
 */
module.exports = function(socket){
    var response = {
        'timestamp': Date.now(),
        'sender': 'server',
        'response': "info",
        'content': "Use commands: login, logout, msg, names, help"
    };
    socket.send(JSON.stringify(response));
};