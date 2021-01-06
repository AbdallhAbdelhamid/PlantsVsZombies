var Funds = document.getElementById("score");

function changeFunds(fundsIn) {
    var fundsElem = document.getElementById("score");
    fundsElem.innerText = Number.parseInt(fundsElem.innerText) + fundsIn;
}

function getFunds() {
    var fundsElem = document.getElementById("score");
    return (Number.parseInt(fundsElem.innerText));
}

var gridObjects = {

    Home: 1,
    Grass: 2,
    ZombiesWall: 3,

};


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

var lane = { // refers to top position of each lane
  LANE1:120,
  LANE2:197,
  LANE3:274,
  LANE4:351,
  LANE5:428,
  LANE6:505,
  LANE7:582
};


function getLane(position){
    if(position < lane.LANE2 )
        return lane.LANE1;
    
    if(position < lane.LANE3)
        return lane.LANE2

    if(position < lane.LANE4)
        return lane.LANE3

    if(position < lane.LANE5)
        return lane.LANE4

    if(position < lane.LANE6)
        return lane.LANE5

    if(position < lane.LANE7)
        return lane.LANE6

    else
        return lane.LANE7
    
}

function Peashooter(peashotterDiv, positionIn) {
    this.gridObject = peashotterDiv;
    this.lane = getLane(positionIn.top);
    this.position = {
        t: positionIn.top,
        l: positionIn.left
    };
    this.shootPic = "<img class='peashooterActive1' src='./images/PB00.gif' >";


    this.shootInterval;
    this.startShooting = function () {
        var that = this;
        this.shootInterval = setInterval(
            function () {
                that.gridObject.append(that.shootPic); // add a shot
                that.gridObject.children().last().css({
                    left: 60,top:10 // match the output
                });
                var deleted = 0; // flag for collision with monster
                $(that.gridObject).children().last().animate(
                    {
                        left: $("#Map").width() - that.position.l - $(".Zombies").width() // until end of map
                    },
                    {
                        duration: 3000,
                        complete: function () {
                            if(!deleted) // delete first shot if no hits
                                $(that.gridObject).children().eq(0).remove(); 
                        },             
                        step: function(now,fx){
                            if ( that.position.l + now >= $("#ZombiesSoldier2").position().left
                                 && that.lane == getLane($("#ZombiesSoldier2").position().left) ) 
                               {
                                    $(fx.elem).stop();
                                    $(fx.elem).remove();
                                    deleted=1;
                                }
                        }
                    });
                // get end of map position
            } , 1000); // shotting speed

        this.stopShooting = function () {
            clearInterval(this.shootInterval);
        }

        this.getProjectilePosition = function () {
            return $(that.gridObject).children().last().position();
        }
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

var levelOneGrid = [
                    1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3,
                    1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3,
                    1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3,
                    1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3,
                    1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3,
                    1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3,
                    1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3
                   ]

$(function () {
    $(".draggable").draggable({
        revert: false,
        helper: "clone",
        snap: ".grass",
        snapMode: "inner",
        snapTolerance: 37.5,
        drag: function (event, ui) {
            if ($(ui.helper).hasClass('peashooter')) {
                $(ui.helper).css("background-image", "url(./images/PShootMove2.gif)").css("background-color", " ");
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
                pShooters[pShooters.length - 1].startShooting();
                console.log( getLane($(this).position().top) );
            } else if (draggedClone.hasClass('sunflower') && getFunds() >= Sun.cost) {
                enoughFunds = true;
                changeFunds(-Sun.cost);
                suns[suns.length] = new Sun(draggedClone);
            }
            if (enoughFunds) {
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
}

drawGrid(levelOneGrid);



//*************************************************************ZOMBIES***************************************************************************//

//crating an array holding the numbers of the zombies created
//zombies class
function Zombie(blood, walkSpeed, zombieStyle) {
    this.blood = blood;
    this.walkSpeed = walkSpeed;
    this.zombieStyle = zombieStyle;
    this.ZombieTimer;
    //Array of Zombies allowable top positions
    this.AllowableZombieTop = ['95px', '172px', '249px', '326px', '403px', '480px', '557px']; //margintop+marginbottom+zombie height
    Zombie.ZombieCount++;
}
//var Zombie.ZombiesArr=[];
Zombie.ZombieCount = 1;

//function o return random indexs for AllowableZombieTop Array
Zombie.prototype.randomZombiePos = function () {
    return this.AllowableZombieTop[Math.floor(Math.random() * this.AllowableZombieTop.length)];
};
//zombies creation function
Zombie.prototype.ZombiesCreation = function () {
    var ZombiesObj = document.createElement("div");
    ZombiesObj.style.left = "1000px"; //#Map width-zombie width pic
    ZombiesObj.style.top = this.randomZombiePos();
    ZombiesObj.classList.add(this.zombieStyle);
    ZombiesObj.setAttribute("id", "ZombiesSoldier" + Zombie.ZombieCount);
    document.getElementById("Map").appendChild(ZombiesObj);
    this.ZombiesMovement(ZombiesObj.id);
}

//creating a functiom to move the zombie till a condition is met
Zombie.prototype.ZombiesMovement = function (_ZombiesObjID) {
    //timer for zombie movement;
    var that = this;
    that.ZombieTimer = setInterval(function () {
        $("#" + _ZombiesObjID).css("left", "-=10");
        if ($("#" + _ZombiesObjID).position().left <= 0) {
            clearInterval(that.ZombieTimer);
            that.ZombiesRemove(_ZombiesObjID);
        }
        //document.getElementById(_ZombiesObjID).style.left -= "50px";
    }, this.walkSpeed);
};
//creating a function to remove the zombie if a condition is met
Zombie.prototype.ZombiesRemove = function (_ZombiesObjID) {
    $("#" + _ZombiesObjID).remove();
};

setTimeout(function () {
    var x1 = new Zombie(10, 500, 'ZombiesSoldier1')
    x1.ZombiesCreation();
}, 300)

//setTimeout(function(){var x1=new Zombie(10,2000,'ZombiesSoldier2')
//x1.ZombiesCreation();},300)
//setTimeout(function(){var x1=new Zombie(10,2000,'ZombiesSoldier3')
//x1.ZombiesCreation();},300)
//setTimeout(function(){var x1=new Zombie(10,2000,'ZombiesSoldier4')
//x1.ZombiesCreation();},300)
//setTimeout(function(){var x1=new Zombie(10,2000,'ZombiesSoldier5')
//x1.ZombiesCreation();},300)









/*********************************  Colision   *******************************************************/
