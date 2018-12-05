var playerType = null;

function setupStart(announcedPlayerType){
    playerType = announcedPlayerType;
}

function gameStart(){

}

function announceGuess(guess){

}

function announceKeys(keys)
{

}

function playerDisconnected()
{

}

var socket = new WebSocket("ws://localhost:3000");

socket.onmessage = function(event){
    var receivedMessage = Message.decode(event.data);
    var receivedType = receivedMessage.type;
    switch(receivedType) {
        case "setupStart":
            setupStart(receivedMessage.data);
        case "gameStart":
            gameStart();
        case "announceGuess":
            announceGuess(receivedMessage.data);
        case "announceKeys":
            announceKeys(receivedMessage.data)
        case "playerDisconnected":
            playerDisconnected();
    }
}

//socket.onopen = function(){
    //var message = new Message("pairrme", "I am player 1!");
    //console.log("sent: " + message);
    //socket.send(message.encode());
//};