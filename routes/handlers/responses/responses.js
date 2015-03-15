/**
 * Created by mattiden on 15.03.15.
 */
var successfulLogInMessage = function(){
    return ({
        'timestamp': Date.now(),
        'sender': "server",
        'response': "info",
        'content': "Logged in successfully"
    })
};

var alreadyLoggedInMessage = function(){
    return ({
        'timestamp': Date.now(),
        'sender': "server",
        'response': "error",
        'content': "You are already logged in. Please log out then back in."
    })
};

var usernameAlreadyExistsMessage = function(){
    return ({
        'timestamp': Date.now(),
        'sender': "server",
        'response': "error",
        'content': "Username already in use"
    })
};

var helpMessage = function(){
    return ({
        'timestamp': Date.now(),
        'sender': 'server',
        'response': "info",
        'content': "Use commands: login, logout, msg, names, help"
    })
};
var loggedOutSuccessfullyMessage = function(){
    return({
        'timestamp': Date.now(),
        'sender': "server",
        'response': "info",
        'content': "Logged out successfully"
    })
};

module.exports = {
    "usernameExists" : usernameAlreadyExistsMessage,
    "alreadyLoggedIn" : alreadyLoggedInMessage,
    "successfullyLoggedIn" : successfulLogInMessage,
    "help" : helpMessage,
    "loggedOutSuccessfully" : loggedOutSuccessfullyMessage
};