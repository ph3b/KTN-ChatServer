/**
 * Created by mattiden on 23.02.15.
 */
var expect = require('expect.js');
var WebSocket = require('ws');
require('./../server.js');

var apiUrl = 'ws://localhost:1337';

describe('General socket endpoints', function(){
    it('should receive welcome text when connected to server', function(done){
        var clientSocket = new WebSocket(apiUrl);
        clientSocket.on('open', function(){
            clientSocket.onmessage = function(message){
                var response = JSON.parse(message.data);
                expect(response.content).to.eql('Welcome to chat server');
                expect(response.response).to.eql('info');
                clientSocket.close();
                done();
            }
        });
    });
    it('should receive error when sending invalid payload format', function(done){
        var clientSocket = new WebSocket(apiUrl);

        var invalidMsg = {"wrong-field": "nothing valid here"};

        clientSocket.on('open', function(){
            clientSocket.send(JSON.stringify(invalidMsg));
            clientSocket.onmessage = function(message){
                var response = JSON.parse(message.data);
                if(response.content !== 'Welcome to chat server' && response.content !== 'Logged in successfully') {
                    expect(response.content).to.eql('Please send payload with the following field: request, content. Type help for more.');
                    expect(response.response).to.eql('error');
                    clientSocket.close();
                    done();
                }
            }
        });

    });
    it('should receive error when sending invalid payload format', function(done){
        var clientSocket = new WebSocket(apiUrl);

        var invalidMsg = {"request": "not-a-valid-command"};

        clientSocket.on('open', function(){
            clientSocket.send(JSON.stringify(invalidMsg));
            clientSocket.onmessage = function(message){
                var response = JSON.parse(message.data);
                if(response.content !== 'Welcome to chat server' && response.content !== 'Logged in successfully') {
                    expect(response.content).to.eql('Please send payload with the following field: request, content. Type help for more.');
                    expect(response.response).to.eql('error');
                    clientSocket.close();
                    done();
                }
            }
        });

    });


    it('should log into server', function(done){
        var clientSocket = new WebSocket(apiUrl);
        clientSocket.on('open', function(){
            var message = {'request': "login", "content": "supermatt"};
                clientSocket.send(JSON.stringify(message));
                clientSocket.onmessage = function(payload){
                    var message = JSON.parse(payload.data);
                    if(message.content !== 'Welcome to chat server') {
                        expect(message.content).to.eql("Logged in successfully");
                        expect(message.response).to.eql("info");
                        clientSocket.close();
                        done();
                    }
                };
        })
    });
    it('should log out of server', function(done){
        var clientSocket = new WebSocket(apiUrl);
        clientSocket.on('open', function(){
            var login = {'request': "login", "content": "supermatt"};
            var logoutCommand = {'request': "logout"};

                clientSocket.send(JSON.stringify(login));
                    clientSocket.send(JSON.stringify(logoutCommand));

                    clientSocket.onmessage = function(res){
                        var response = JSON.parse(res.data);
                        if(response.content !== 'Welcome to chat server' && response.content !== 'Logged in successfully') {
                            expect(response.content).to.eql("Logged out successfully");
                            expect(response.response).to.eql("info");
                            expect(response.sender).to.eql("server");
                            clientSocket.close();
                            done();
                        }
                    }
        })
    });

    it('should get error when login out of server without being logged in', function(done){
        var clientSocket = new WebSocket(apiUrl);
        clientSocket.on('open', function(){
            var logoutCommand = {'request': "logout"};
                    clientSocket.send(JSON.stringify(logoutCommand));
                    clientSocket.onmessage = function(res){
                        var response = JSON.parse(res.data);
                        if(response.content !== 'Welcome to chat server') {
                            expect(response.content).to.eql("Not logged in. Please log in.");
                            expect(response.response).to.eql("error");
                            clientSocket.close();
                            done();
                        }
                    }
        })
    });

    it('should not be able to get list of usernames when not logged in',function(done){
        var clientSocket = new WebSocket(apiUrl);
        var message = {'request': 'names'};

        clientSocket.on('open', function(){
            clientSocket.send(JSON.stringify(message));

            clientSocket.onmessage = function(payload){
                var message = JSON.parse(payload.data);
                if(message.content !== 'Welcome to chat server') {
                    expect(message.content).to.eql("Not logged in. Please log in.");
                    expect(message.response).to.eql("error");
                    clientSocket.close();
                    done();
                }
            };
        });


    });

    it('should get list of usernames',function(done){
        var clientSocket = new WebSocket(apiUrl);

            var user = {"request": "login", "content": "supermatt"};
        clientSocket.on('open', function(){
            clientSocket.send(JSON.stringify(user));

            var req = {"request": "names"};

            clientSocket.send(JSON.stringify(req));
            clientSocket.onmessage = function(msg){
                var response = JSON.parse(msg.data);
                if(response.content !== 'Welcome to chat server' && response.content !== 'Logged in successfully') {
                    expect(response.content).to.eql(["supermatt"]);
                    expect(response.content).to.be.a("array");
                    clientSocket.close();
                    done();
                }
            }
        })

    });

    it('should get list of commands',function(done){
        var clientSocket = new WebSocket(apiUrl);
        var request = { "request": "help"};
        clientSocket.on('open', function(){
            clientSocket.send(JSON.stringify(request));

            clientSocket.onmessage = function(msg){
                var response = JSON.parse(msg.data);
                if(response.content !== 'Welcome to chat server' && response.content !== 'Logged in successfully') {
                    expect(response.content).to.eql("Use commands: login, logout, msg, names, help");
                    clientSocket.close();
                    done();
                }
            }
        });

    });

    it('Should not be able to log in with existing username',function(done){
        var client1 = new WebSocket(apiUrl);
        var client2 = new WebSocket(apiUrl);

            var client1cred = {"request": "login", "content": "supermatt"};
            var client2cred = {"request": "login", "content": "supermatt"};
            client1.on('open', function(){
                client2.on('open', function() {
                    client1.send(JSON.stringify(client1cred));
                    client2.send(JSON.stringify(client2cred));

                    client1.onmessage = function(client1response){
                        client2.onmessage = function(client2response){
                            var response = JSON.parse(client2response.data);
                            if(response.content !== 'Welcome to chat server' && response.content !== 'Logged in successfully') {
                                expect(response.content).to.be.eql("Username already in use");
                                expect(response.response).to.be.eql("error");
                                client1.close();
                                client2.close();
                                done();
                            }
                        }
                    };
                })
            });

    });
});
