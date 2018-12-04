function Message(type, data){
        this.type = type;
        this.data = data;
        this.encode = function(){return JSON.stringify(this);}
    };

    Message.decode = function(data){return JSON.parse(data);}

if(!(typeof exports === "undefined")){
    module.exports = Message;
}
