/**
 * Created by mattiden on 24.02.15.
 */
var expect = require('expect.js');
var WebSocket = require('ws');
require('./../server.js');

describe('Chatting functionality', function(){
    it('should not be able to send message when not logged in',function(done){
        var clientSocket = new WebSocket('ws://localhost:1337');
        var message = {'request': 'msg', 'content': 'I am message'};

        clientSocket.on('open', function(){
            clientSocket.send(JSON.stringify(message));

            clientSocket.onmessage = function(payload){
                var response = JSON.parse(payload.data);
                if(response.content !== 'Welcome to chat server'){
                    expect(response.content).to.eql("Not logged in. Please log in.");
                    expect(response.response).to.eql("error");
                    clientSocket.close();
                    done();
                }

            };
        });


    });
    it('Client 3 should get chat from client 1 when logged in',function(done){
        var client1 = new WebSocket('ws://localhost:1337');
        var client2 = new WebSocket('ws://localhost:1337');

            var client1cred = {"request": "login", "content": "Northug"};
            var client2cred = {"request": "login", "content": "Sundby"};
        client1.on('open', function(){
            client2.on('open', function(){
                client1.send(JSON.stringify(client1cred));
                client2.send(JSON.stringify(client2cred));

                var chatMessage = {"request": "msg", "content": "Du suger!"};
                client1.send(JSON.stringify(chatMessage));

                client1.onmessage = function(client1response){
                    client2.onmessage = function(client2response){
                        response = JSON.parse(client2response.data);
                        if(response.content !== 'Welcome to chat server' && response.content !== 'Logged in successfully') {
                            expect(response.sender).to.be.eql("Northug");
                            expect(response.content).to.be.eql("Du suger!");
                            expect(response.response).to.be.eql("info");
                            client1.close();
                            client2.close();
                            done();
                        }
                    }
                };
            })
        });
    });
    it('Client 2 should get chat from client 1 when logged in',function(done){
        var client1 = new WebSocket('ws://localhost:1337');
        var client2 = new WebSocket('ws://localhost:1337');
        var client3 = new WebSocket('ws://localhost:1337');

        var client1cred = {"request": "login", "content": "Northug"};
        var client2cred = {"request": "login", "content": "Sundby"};
        var client3cred = {"request": "login", "content": "Bjørgen"};
        client1.on('open', function(){
            client2.on('open', function(){
                client3.on('open', function() {
                    client1.send(JSON.stringify(client1cred));
                    client2.send(JSON.stringify(client2cred));
                    client2.send(JSON.stringify(client3cred));

                    var chatMessage = {"request": "msg", "content": "Du suger!"};
                    client1.send(JSON.stringify(chatMessage));
                    client3.onmessage = function(client3response){
                        response = JSON.parse(client3response.data);
                        if(response.content !== 'Welcome to chat server' && response.content !== 'Logged in successfully') {
                            expect(response.sender).to.be.eql("Northug");
                            expect(response.content).to.be.eql("Du suger!");
                            expect(response.response).to.be.eql("info");
                            client1.close();
                            client2.close();
                            done();
                        }
                    }
                })
            })
        });
    });

});