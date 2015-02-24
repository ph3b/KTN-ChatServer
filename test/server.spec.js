/**
 * Created by mattiden on 23.02.15.
 */
var expect = require('expect.js');
var WebSocket = require('ws');


describe('Socket tests', function(){
    it('should recieve welcome text when connected to server', function(done){
        var clientSocket = new WebSocket('ws://localhost:1337');
        clientSocket.onmessage = function(message){
            expect(message.data).to.eql('Welcome to chat server');
            clientSocket.close();
            done();
        }
    });
    it('should log into server', function(done){
        var clientSocket = new WebSocket('ws://localhost:1337');

        clientSocket.on('open', function(){
            var message = {'request': "login", "content": "supermatt"};

            setTimeout(function(){
                clientSocket.send(JSON.stringify(message));

                clientSocket.onmessage = function(payload){
                    var message = JSON.parse(payload.data);
                    expect(message.content).to.eql("Logged in successfully");
                    expect(message.response).to.eql("info");
                    clientSocket.close();
                    done();
                };
            }, 1000);
        })
    });
    it('shoult not be able to send message when not logged in',function(done){
        var clientSocket = new WebSocket('ws://localhost:1337');
        var message = {'request': 'msg', 'content': 'I am message'};

        setTimeout(function(){
            clientSocket.send(JSON.stringify(message));

            clientSocket.onmessage = function(payload){
                var message = JSON.parse(payload.data);
                expect(message.content).to.eql("Not logged in. Please log in.");
                expect(message.response).to.eql("error");
                clientSocket.close();
                done();
            };
        }, 1000)

    });

    it('shoult not be able to get list of usernames when not logged in',function(done){
        var clientSocket = new WebSocket('ws://localhost:1337');
        var message = {'request': 'names'};

        setTimeout(function(){
            clientSocket.send(JSON.stringify(message));

            clientSocket.onmessage = function(payload){
                var message = JSON.parse(payload.data);
                expect(message.content).to.eql("Not logged in. Please log in.");
                expect(message.response).to.eql("error");
                clientSocket.close();
                done();
            };
        }, 1000)

    });

    it('should get list of usernames',function(done){
        var clientSocket = new WebSocket('ws://localhost:1337');

        setTimeout(function(){
            var user = {"request": "login", "content": "supermatt"};
            clientSocket.send(JSON.stringify(user));

            setTimeout(function(){
                var req = {"request": "names"};
                clientSocket.send(JSON.stringify(req));
                clientSocket.onmessage = function(msg){
                    var response = JSON.parse(msg.data);
                    expect(response.content).to.eql(["supermatt"]);
                    expect(response.content).to.be.a("array");
                    done();
                }
            }, 500);
        }, 1000);
    });

    it('should get list of commands',function(done){
        var clientSocket = new WebSocket('ws://localhost:1337');
        var request = { "request": "help"};
        setTimeout(function(){
            clientSocket.send(JSON.stringify(request));

            clientSocket.onmessage = function(msg){
                var response = JSON.parse(msg.data);
                expect(response.content).to.eql("Use commands: login, logout, msg, names, help");
                done();
            }
        }, 1000);
    })
});
