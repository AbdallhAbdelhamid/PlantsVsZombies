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
    LANE1: 120,
    LANE2: 197,
    LANE3: 274,
    LANE4: 351,
    LANE5: 428,
    LANE6: 505,
    LANE7: 582
};


function getLane(position) {
    if (position < lane.LANE2)
        return lane.LANE1;

    if (position < lane.LANE3)
        return lane.LANE2

    if (position < lane.LANE4)
        return lane.LANE3

    if (position < lane.LANE5)
        return lane.LANE4

    if (position < lane.LANE6)
        return lane.LANE5

    if (position < lane.LANE7)
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
    this.attacking = false;
    this.startShooting = function (zombie) {
        if (this.attacking) return;
        this.attacking = true;
        var that = this;
        var count = 0;
        this.shootInterval = setInterval(
            function () {
                that.gridObject.append(that.shootPic); // add a shot
                that.gridObject.children().last().css({
                    left: 60,
                    top: 10 // match the output
                });
                var deleted = 0; // flag for collision with monster
                $(that.gridObject).children().last().animate({
                    left: $("#Map").width() - that.position.l - $(".Zombies").width() // until end of map
                }, {
                    duration: 3000,
                    complete: function () {
                        if (!deleted) // delete first shot if no hits
                            $(that.gridObject).children().eq(0).remove();
                    },
                    step: function (now, fx) {
                        if ( that.position.l + now >= $("#" + zombie).position().left)
                        //&&
                        //that.lane == 193) //getLane($("#ZombiesSoldier2").position().left) ) 
                        {
                            $(fx.elem).stop();
                            $(fx.elem).remove();
                            deleted = 1;
                            count++;
                            if (count == 5) { // decrease zombie health here / need to loop on all shooters and remove thier children
                                count=0;
                                $(that.gridObject).children().stop(true).remove();
                                that.stopShooting();
                                const index = Zombie.ZombiesArr.indexOf(zombie);
                                if (index > -1) {
                                    Zombie.ZombiesArr.splice(index, 1);
                                }
                                $("#" + zombie).remove();

                            }
                        }
                    }
                });
                // get end of map position
            }, 1000)
    }; // shotting speed

    this.stopShooting = function () {
        clearInterval(this.shootInterval);
        this.attacking = false;
    };

    this.getProjectilePosition = function () {
        return $(that.gridObject).children().last().position();
    };
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
                $(ui.helper).css({
                    "background-image": "url(./images/PShootMove2.gif)",
                    "background-color": "transparent"
                })
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
                draggedClone.css({
                    "background-image": "url(./images/PShootMove2.gif)",
                    "background-color": "transparent"
                });
                pShooters[pShooters.length] = new Peashooter(draggedClone, $(this).position());
                // pShooters[pShooters.length - 1].startShooting();
            } else if (draggedClone.hasClass('peashooter2') && getFunds() >= Peashooter.cost) {
                enoughFunds = true;
                changeFunds(-Peashooter.cost);
                draggedClone.css({
                    "background-image": "url(./images/Cards/snow-pea.gif)"
                });
                pShooters[pShooters.length] = new Peashooter(draggedClone, $(this).position());
                //  pShooters[pShooters.length - 1].startShooting();
            } else if (draggedClone.hasClass('peashooter3') && getFunds() >= Peashooter.cost) {
                enoughFunds = true;
                changeFunds(-Peashooter.cost);
                draggedClone.css({
                    "background-image": "url(./images/Cards/pea-shooter2.gif)"
                });
                pShooters[pShooters.length] = new Peashooter(draggedClone, $(this).position());
                // pShooters[pShooters.length - 1].startShooting();

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

})


var int1 = setInterval(function () {
    pShooters.forEach(function (pShotter) {
        Zombie.ZombiesArr.forEach(function (zombie) {
            //console.log("SHOTTER  "+pShotter.lane);
            //console.log("ZOMBIE  "+getLane($("#"+zombie).position().top ));
            if (pShotter.lane == getLane($("#" + zombie).position().top))
                pShotter.startShooting(zombie);
        })

    })

}, 200);









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
    this.ZombieLeftMovement = "-=10";
    //Array of Zombies allowable top positions
    this.AllowableZombieTop = ['120px', '197px', '274px', '351px', '428px', '505px', '582px']; //margintop+marginbottom+zombie height
    Zombie.ZombieCount++;
}
Zombie.ZombiesArr = [];
Zombie.ZombieClasses = ['ZombiesSoldier1'];
Zombie.ZombieCount = 0;


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
    Zombie.ZombiesArr.push(ZombiesObj.id);
    this.ZombiesMovement(ZombiesObj.id);
}
//-60
var HouseLoss = 0; //zombie reached our home aand we lost the game -60

//creating a functiom to move the zombie till a condition is met
Zombie.prototype.ZombiesMovement = function (_ZombiesObjID) {
    //timer for zombie movement;
    var that = this;
    that.ZombieTimer = setInterval(function () {
        $("#" + _ZombiesObjID).css("left", that.ZombieLeftMovement);
        if (this.blood == 0) {
            clearInterval(that.ZombieTimer);
            that.ZombiesRemove(_ZombiesObjID);
        }
        if ($("#" + _ZombiesObjID).position().left <= HouseLoss) {
            // we  need to open the door and call game over function
            clearInterval(that.ZombieTimer);
        }

    }, this.walkSpeed);
};
//creating a function to remove the zombie if a condition is met
Zombie.prototype.ZombiesRemove = function (_ZombiesObjID) {
    var bg_img = $("#" + _ZombiesObjID).css("background-image");
    console.log(bg_img);
    if (bg_img == 'url("http://127.0.0.1:5500/PlantsVsZombies/images/Zombie1/0Zombie1.gif")')
        $("#" + _ZombiesObjID).css({
            "background-image": "url(./images/Zombie/ZombieDie.gif)"
        });

    else if (bg_img == 'url("http://127.0.0.1:5500/PlantsVsZombies/images/Zombie2/0Zombie2.gif")')
        $("#" + _ZombiesObjID).css({
            "background-image": "url(./images/Zombie2/ZombieHead.gif)"
        });

    else if (bg_img == 'url("http://127.0.0.1:5500/PlantsVsZombies/images/Zombie3/0Zombie3.gif")')
        $("#" + _ZombiesObjID).css({
            "background-image": "url(./images/Zombie3/ZombieDie.gif)"
        });

    else if (bg_img == 'url("http://127.0.0.1:5500/PlantsVsZombies/images/Zombie4/0Zombie4.gif")')
        $("#" + _ZombiesObjID).css({
            "background-image": "url(./images/Zombie4/FlagZombieLostHead.gif)"
        });

    else if (bg_img == 'url("http://127.0.0.1:5500/PlantsVsZombies/images/Zombie5/0Zombie5.gif")')
        $("#" + _ZombiesObjID).css({
            "background-image": "url(./images/Zombie2/ZombieHead.gif)"
        });

    setTimeout(function () {
        $("#" + _ZombiesObjID).remove();
        var zombieIdIndex = Zombie.ZombiesArr.indexOf(_ZombiesObjID)
        Zombie.ZombiesArr.splice(zombieIdIndex, "1");
    }, 2000)

};


//function to return random Zombies solider Class 
function randomZombiesoliderClass() {
    return Zombie.ZombieClasses[Math.floor(Math.random() * Zombie.ZombieClasses.length)];
};
var ZombiesClassNO = 2;
//function to push new zombie Solider class  after period of time 
function PushZombiesoliderClass() {
    Zombie.ZombieClasses.push('ZombiesSoldier' + ZombiesClassNO)
    ZombiesClassNO++;
};

//function to return the health of the created zombie
function ZombieObjHealth(ZombieObjClass) {
    if (ZombieObjClass == 'ZombiesSoldier1') return 10;
    else if (ZombieObjClass == 'ZombiesSoldier2') return 15;
    else if (ZombieObjClass == 'ZombiesSoldier3') return 20;
    else if (ZombieObjClass == 'ZombiesSoldier4') return 25;
    else if (ZombieObjClass == 'ZombiesSoldier5') return 30;
};
//function to return the speed of the created zombie
function ZombieObjSpeed(ZombieObjClass) {
    if (ZombieObjClass == 'ZombiesSoldier1') return 300;
    else if (ZombieObjClass == 'ZombiesSoldier2') return 350;
    else if (ZombieObjClass == 'ZombiesSoldier3') return 400;
    else if (ZombieObjClass == 'ZombiesSoldier4') return 500;
    else if (ZombieObjClass == 'ZombiesSoldier5') return 550;
};


//////////////start the game for zombies ////////////////////////////////////////

var Timer = 0; //Timer To  push new Zombie Class

var Time = {
    twentyseconds: 20,
    fortySeconds: 40,
    sixtySeconds: 60,
    eightySeconds: 80

}

function ZombieStart() {
    var ZombieObjClass = randomZombiesoliderClass();
    var ZombieHealth = ZombieObjHealth(ZombieObjClass);
    var ZombieSpeed = ZombieObjSpeed(ZombieObjClass);
    var ZombiesTimer = 5000;
    if (Timer == Time.eightySeconds) ZombiesTimer = 3000;
    var ZombieObj = new Zombie(ZombieHealth, ZombieSpeed, ZombieObjClass)
    ZombieObj.ZombiesCreation();
    Timer++
    if (Timer == Time.twentyseconds || Timer == Time.fortySeconds || Timer == Time.sixtySeconds || Timer == Time.eightySeconds) {
        PushZombiesoliderClass();
    };
    setTimeout(ZombieStart, ZombiesTimer)
}

ZombieStart();
