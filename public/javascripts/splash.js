
var menu = new Menu();

if(window.matchMedia("(max-width: 450px)").matches || window.matchMedia("(max-height: 540px)").matches){
    alert("It seems like your device's resolution is below 450x540. For the best experience, please play Meisterkopf on a device with minimum resolution of 450x540. Or maximize your window ");
}

function Menu(){

    this.play = function(){
        sound.play();
        setTimeout(function(){ window.location = '/play'; }, 200);
    }
}