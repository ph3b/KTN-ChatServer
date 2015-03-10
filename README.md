# KTN-ChatServer
[![Build Status](https://travis-ci.org/ph3b/KTN-ChatServer.svg?branch=master)](https://travis-ci.org/ph3b/KTN-ChatServer)


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
