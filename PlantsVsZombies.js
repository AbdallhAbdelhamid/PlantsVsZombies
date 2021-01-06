var Funds = document.getElementById("score");

function changeFunds (fundsIn){
    var fundsElem = document.getElementById("score");
    fundsElem.innerText = Number.parseInt(fundsElem.innerText)+fundsIn; 
}
function getFunds (){
    var fundsElem = document.getElementById("score");
    return (Number.parseInt(fundsElem.innerText)); 
}

var gridObjects = {

    Home: 1,
    Grass: 2,
    ZombiesWall: 3,

};
var levelOneGrid = [
                    1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3,
                    1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3,
                    1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3,
                    1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3,
                    1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3,
                    1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3,
                    1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3,
                    1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3,
                   ]


function drawGrid(gridArrIn) {
    // delete old grid from screen
    document.getElementById("Map").innerHTML = "";
    for (var i = 0; i < gridArrIn.length; i++) {
        // draw new grid
        if (gridArrIn[i] == gridObjects.Home) document.getElementById("Map").innerHTML += "<div class='house'></div>"
        else if (gridArrIn[i] == gridObjects.Grass) document.getElementById("Map").innerHTML += "<div class='grass'></div>"
        else if (gridArrIn[i] == gridObjects.ZombiesWall) document.getElementById("Map").innerHTML += "<div class='Zombies'></div>"

    }
}


function Peashooter(peashotterDiv, position) {
    this.gridObject = peashotterDiv;

    this.position = {
        t: position.top,
        l: position.left
    };
    this.shootPic = "<img class='peashooterActive1' src='./images/PB00.gif' >";
    this.shootInterval;
    this.Shoot = function () {
        var that = this;
        this.shootInterval = setInterval(
            function () {
                that.gridObject.append(that.shootPic); // add a shot
                that.gridObject.children().last().css({
                    left: 100
                });
                $(that.gridObject).children().animate( // animate the shot
                    {
                        left: $("#Map").width() - that.position.l - $(".Zombies").width()
                    }, // get end of map position
                    2000, // shot speed ( projectile speed)
                    function () {
                        $(that.gridObject).children().eq(0).remove();
                    }); // remove first shotted.
            }, 1000); // shotting speed
    }
}
Peashooter.cost = 100;


function Sun(sunDiv) {
    this.gridObject = sunDiv;
    this.addSunInterval = setInterval(function () { // add 50 sun every fixed time 
        changeFunds(Sun.cost);

    }, 3000);
    this.destroySun = function () { // stop adding sun
        clearInterval(this.addSunInterval);
    }

}
Sun.cost = 50;



var pShooters = [];
var suns = [];

$(function () {
    $(".draggable").draggable({
        revert: false,
        helper: "clone",
        snap: ".grass",
        snapMode: "inner",
        snapTolerance: 100,
        drag: function (event, ui) {
            if ($(ui.helper).hasClass('peashooter')) {
                $(ui.helper).css("background-image", "url(./images/PShootMove2.gif)")
            } else if ($(ui.helper).hasClass('sunflower')) {

                $(ui.helper).css("background-image", "url(./images/SunFlower.gif)")
            }
        }
    });

    $(".grass").droppable({
        accepts: ".draggable",
        drop: function (event, ui) {
            var draggedClone = $(ui.helper).clone();
            var enoughFunds = false;

            if (draggedClone.hasClass('peashooter') && getFunds() >= Peashooter.cost) {
                enoughFunds = true;
                changeFunds(-Peashooter.cost);
                draggedClone.css("background-image", "url(./images/PShootMove2.gif)")
                pShooters[pShooters.length] = new Peashooter(draggedClone, $(this).position());
                pShooters[pShooters.length - 1].Shoot();
            } else if (draggedClone.hasClass('sunflower') && getFunds() >= Sun.cost ) {
                enoughFunds = true;
                changeFunds(-Sun.cost);
                suns[suns.length] = new Sun(draggedClone);
                
            }
            if(enoughFunds){
                $(this).append(draggedClone);
                $(this).droppable("disable");
            }
        }
    });
});



var myElement;
var timer1;
var x = 10;

function Shooting(s) {
    s.append("<img class='peashooterActive1' src='./images/PB00.gif' >");

    timer1 = setInterval(ABC, 200);


}

function ABC() {

    //  myElement =document.getElementById("peashooterActive1");
    $(".peashooterActive1").animate({
        left: "1500"
    }, 3000)

    //  x+=50;
    //  var y=500;
    //  myElement.style.left=x+"px";
    //  if( myElement.style.left==y)
    //  {

    //  }
}
drawGrid(levelOneGrid);
