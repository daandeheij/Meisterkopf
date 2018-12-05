function Message(type, data){
    this.type = type;
    this.data = data;

    this.encode = function(){
        return JSON.stringify(this);
    }
};

Message.decode = function(data){
    return JSON.parse(data);
}

Message.setupGame = function(playerType){
    var message = new Message("setupGame", playerType);
    return message.encode();
}

Message.startGame = function(){
    var message = new Message("startGame", null);
    return message.encode();
}

Message.playerDisconnected = function(){
    var message = new Message("playerDisconnected", null);
    return message.encode();
}

Message.announceGuess = function(guess){
    var message = new Message("announceGuess", guess);
    return message.encode();
}

Message.announceKeys = function(keys){
    var message = new Message("announceKeys", keys);
    return message.encode();
}

Message.endRound = function(result){
    var message = new Message("endRound", result);
    return message.encode();
}


if(!(typeof exports === "undefined")){
    module.exports = Message;
}
