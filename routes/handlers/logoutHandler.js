/**
 * Created by mattiden on 24.02.15.
 */
module.exports = function(socket, connections){
    connections.splice(connections.indexOf(socket), 1);
};