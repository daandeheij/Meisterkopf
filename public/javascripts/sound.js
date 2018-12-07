var sound = new Sound();

function Sound(){

    this.click = new Audio("sounds/click.mp3");

    this.play = function(){
        this.click.play();
    }
}