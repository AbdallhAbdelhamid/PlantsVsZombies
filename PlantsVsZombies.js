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

var levelOneGrid = [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3,
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
                $(ui.helper).css({"background-image": "url(./images/PShootMove2.gif)","background-color":"transparent"})
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
                draggedClone.css({"background-image": "url(./images/PShootMove2.gif)","background-color":"transparent"});
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

  
}

  drawGrid(levelOneGrid);



//*************************************************************ZOMBIES***************************************************************************//

//crating an array holding the numbers of the zombies created
//zombies class
function Zombie(blood, walkSpeed, zombieStyle) {
    this.blood = blood;
    this.walkSpeed = walkSpeed;
    this.zombieStyle=zombieStyle;
    this.ZombieTimer;
    //Array of Zombies allowable top positions
    this.AllowableZombieTop = ['120px', '197px', '274px', '351px', '428px', '505px', '582px']; //margintop+marginbottom+zombie height
    Zombie.ZombieCount++;
}
//var Zombie.ZombiesArr=[];
Zombie.ZombieCount=1;

//function o return random indexs for AllowableZombieTop Array
Zombie.prototype.randomZombiePos=function () {
   return this.AllowableZombieTop[Math.floor(Math.random() * this.AllowableZombieTop.length)];
};
//zombies creation function
Zombie.prototype.ZombiesCreation=function (){
    var ZombiesObj = document.createElement("div");
    ZombiesObj.style.left = "1000px";//#Map width-zombie width pic
    ZombiesObj.style.top = this.randomZombiePos();
    ZombiesObj.classList.add(this.zombieStyle);
    ZombiesObj.setAttribute("id", "ZombiesSoldier"+Zombie.ZombieCount);
    document.getElementById("Map").appendChild(ZombiesObj);
    //Zombie.ZombiesArr.push(ZombiesObj.id);
    this.ZombiesMovement(ZombiesObj.id);
}

//creating a functiom to move the zombie till a condition is met
Zombie.prototype.ZombiesMovement=function (_ZombiesObjID){
    //timer for zombie movement;
    var that=this;
    that.ZombieTimer=setInterval(function(){
        $("#"+_ZombiesObjID).css("left", "-=10");
        if($("#"+_ZombiesObjID).position().left<=0){
            clearInterval(that.ZombieTimer);
            that.ZombiesRemove(_ZombiesObjID);
        }
        //document.getElementById(_ZombiesObjID).style.left -= "50px";
    },this.walkSpeed);
};
//creating a function to remove the zombie if a condition is met
Zombie.prototype.ZombiesRemove=function (_ZombiesObjID){
    $("#"+_ZombiesObjID).remove();
};

setTimeout(function(){var x1=new Zombie(10,200,'ZombiesSoldier1')
x1.ZombiesCreation();},300)
setTimeout(function(){var x1=new Zombie(10,200,'ZombiesSoldier2')
x1.ZombiesCreation();},300)
setTimeout(function(){var x1=new Zombie(10,200,'ZombiesSoldier3')
x1.ZombiesCreation();},300)
setTimeout(function(){var x1=new Zombie(10,200,'ZombiesSoldier4')
x1.ZombiesCreation();},300)
setTimeout(function(){var x1=new Zombie(10,200,'ZombiesSoldier5')
x1.ZombiesCreation();},300)


