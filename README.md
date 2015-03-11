# KTN-ChatServer
[![Build Status](https://travis-ci.org/ph3b/KTN-ChatServer.svg?branch=master)](https://travis-ci.org/ph3b/KTN-ChatServer)
[![Coverage Status](https://coveralls.io/repos/ph3b/KTN-ChatServer/badge.svg?branch=master)](https://coveralls.io/r/ph3b/KTN-ChatServer?branch=master)

A basic chat server written in Node.JS using basic TCP websockets. Sends and receives JSON.
  Payload to server should be a JSON object in this form:
  
  { "request" : command, "content" : content }
  
Commands:
 - login < username >
 - logout
 - msg < Your message >
 - help - Shows available commands
 - names - shows online usernames

# Run and install
    $ npm install
    $ node server.js
# Tests
    $ npm test


Client can be found here: https://github.com/ph3b/KTN-ChatServer/
