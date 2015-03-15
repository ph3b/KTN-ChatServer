/**
 * Created by mattiden on 24.02.15.
 */
var response = require('./responses/responses');

module.exports = function(socket){
    socket.send(JSON.stringify(response.help()));
};