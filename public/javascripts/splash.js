
var menu = new Menu();

function Menu(){

    this.play = function(){
        sound.play();
        setTimeout(function(){ window.location = '/play'; }, 200);
    }
}