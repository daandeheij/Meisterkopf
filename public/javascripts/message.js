
class Message{
    constructor(type, data) {
        this.type = type;
        this.data = data;
    }

    get getType(){ 
        return this.type; 
    }

    get getData(){
        return this.data;
    }

    encode(){
        return JSON.stringify(this);
    }

    static decode(data){

        return JSON.parse(data);
    }
}

module.exports = Message;