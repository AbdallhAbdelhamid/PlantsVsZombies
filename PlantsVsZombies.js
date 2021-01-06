var gridObjects = {
   
    Home: 1,
    Grass: 2,
    ZombiesWall: 3,
   
};
var levelOneGrid = [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3,
                    1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3,
                    1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3,
                    1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3,
                    1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3,
                    1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3,
                    1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3
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
// $(function () {
//     $("#peashooter").draggable({ revert: true ,helper: "clone"});
// //    ui.draggable.("#c1 .component-group").serialize()
//     $(".grass").droppable({
//         drop: function (event, ui) {
          
//             $(this).draggable("instance")({revert:true,disabled:true});
//             console.log("ahmed");

//         }
      
//     });
// });
$(function () {
    $(".draggable").draggable({
        revert: false,
        helper: "clone",
        snap:".grass",
        snapMode:"inner",
        snapTolerance: 100
        
    
    });
    $(".grass").droppable({
        accepts: ".draggable",
        drop: function (event, ui) {
            var s = $(ui.helper).clone();
            $(this).append(s);
            $(this).droppable("disable");
            Shooting(s);

        }
        
    });
});

// $(function () {
//     $(".draggable").draggable({
//         revert: false,
//         helper: "clone",
//         grid:[100,100]
//     });
//     $(".grass").droppable({
//         accepts: ".draggable",
//         drop: function (event, ui) {
//             var s = $(ui.helper).clone();
//             $(this).append(s);
//             $(this).droppable("disable");

//         }
        
//     });
// });

var myElement;
var timer1;
var x=10;

function Shooting(s){
    s.append("<img class='peashooterActive1' src='./images/PB00.gif' >");
    timer1 =setInterval(ABC,200);
 

}
function ABC()
    {
       
    //  myElement =document.getElementById("peashooterActive1");
     $(".peashooterActive1").animate({left:"1500"},3000)

    //  x+=50;
    //  var y=500;
    //  myElement.style.left=x+"px";
    //  if( myElement.style.left==y)
    //  {

    //  }
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
    this.AllowableZombieTop = ['95px', '172px', '249px', '326px', '403px', '480px', '557px']; //margintop+marginbottom+zombie height
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








 /*function Zombie(blood, walkSpeed, left, category) {
        var dzombies = document.getElementById("dzombies");
        this.left = (left || 850);//距离左边距离
        this.zombie = this.init();//初始化
        this.blood = (blood || 10);//血量
        this.walkSpeed = (walkSpeed || 80);//僵尸移动速度
        this.category = (category || "Zombie/Zombie");//僵尸种类
    }
    //僵尸初始化的方法
    Zombie.prototype.init = function () {
        var zombie = document.createElement("div");
        zombie.style.left = this.left + "px";
        zombie.innerHTML = "<img src='img/plantshadow32.png' style='position:absolute; left: 72px; top: 122px;'><img src='img/Zombie/Zombie.gif'>";
        dzombies.appendChild(zombie);
        return zombie;
    };
    //正常走路
    Zombie.prototype.walk = function () {
        var o = this;
        this.zombieWalk = setInterval(function () {
            o.zombie.style.left = o.zombie.offsetLeft - 1 + "px";
            if (o.zombie.offsetLeft < -100) {
                if (gameEnd) return;
                gameOver();
            }
        }, this.walkSpeed);
        var imgs = this.zombie.getElementsByTagName("img");
        imgs[1].src = "img/" + this.category + ".gif";
    };
    //无头行走
    Zombie.prototype.noHeadWalk = function () {
        var o = this;
        this.zombieWalk = setInterval(function () {
            o.zombie.style.left = o.zombie.offsetLeft - 1 + "px";
            if (o.zombie.offsetLeft < -100) {
                if (gameEnd) return;
                gameOver();
            }
        }, this.walkSpeed);
        var imgs = this.zombie.getElementsByTagName("img");
        imgs[1].src = "img/" + this.category + "LostHead.gif";
    };
    //头颅掉落
    Zombie.prototype.lostHead = function () {
        var head = document.createElement("img");
        head.src = "img/Zombie/ZombieHead.gif";
        head.className = "head";
        head.style.left = this.zombie.offsetLeft + "px";
        head.style.top = this.zombie.offsetTop + "px";
        dzombies.appendChild(head);
        setTimeout(function () {
            dzombies.removeChild(head);
        }, 1000);
    };
    //停止走路
    Zombie.prototype.stopWalk = function () {
        clearInterval(this.zombieWalk);
    };
    //咀嚼植物
    Zombie.prototype.eatPlant = function () {
        this.stopWalk();
        var imgs = this.zombie.getElementsByTagName("img");
        imgs[1].src = "img/" + this.category + "Attack.gif";
    };
    //无头的咀嚼植物
    Zombie.prototype.noHeadEatPlant = function () {
        this.stopWalk();
        var imgs = this.zombie.getElementsByTagName("img");
        imgs[1].src = "img/" +  this.category + "LostHeadAttack.gif";
    };
    //僵尸倒地
    Zombie.prototype.down = function () {
        this.stopWalk();
        var imgs = this.zombie.getElementsByTagName("img");
        imgs[1].src = "img/Zombie/ZombieDie.gif";
    };
    //僵尸死亡
    Zombie.prototype.die = function (dieJS) {
        dieJS.push(true);
        dzombies.removeChild(this.zombie);
    };




























function Plant(blood, buildShootSpeed) {
        var plants = document.getElementById("plants");
        var dzombies = document.getElementById("dzombies");
        this.plant = this.init();//初始化
        this.blood = (blood || 4);//血量
        this.buildShootSpeed = (buildShootSpeed || 2000);//子弹发射速度
    }
    //植物初始化的方法
    Plant.prototype.init = function () {
        var plant = document.createElement("div");
        plant.innerHTML = '<img src="img/plantshadow32.png" style="left:-12px;top:49px;"><img src="img/Peashooter.gif">';
        return plant;
    };
    //种植物方法
    Plant.prototype.doPlant = function (left, top) {
        this.plant.style.left = (left || 500) + "px";//如果left不存在，取500
        this.plant.style.top = (top || 294) + "px";//如果top不存在，取294
        plants.appendChild(this.plant);
    };
    //创建子弹方法
    Plant.prototype.bullet = function () {
        var bullet = document.createElement("img");
        bullet.src = "img/PB00.gif";
        bullet.className = "bullet";
        bullet.style.left = this.plant.offsetLeft + 30 + "px";
        bullet.style.top = this.plant.offsetTop -3 +"px";
        dzombies.appendChild(bullet);
        return bullet;
    };
    //植物射击的方法
    var new_jsGroup;
    var stopJs = [];
    var dieJS = [];
    Plant.prototype.shoot = function (jsGroup) {
        var o = this;
        //创建子弹打击僵尸的方法
        var new_shoot = function () {
            if (jsGroup.length < 1) return;
            //判定植物右侧是否存在僵尸
            var jsOffset = [];
            for (var n in jsGroup) {
                if (!jsGroup[n].zombie) continue;
                if (!o.plant) continue;
                jsOffset.push(jsGroup[n].zombie.offsetLeft);
            }
            //植物右侧没有僵尸不射击,通过获取jsOffset中最大值计算
            if ((Math.max.apply(null, jsOffset) + 35) < o.plant.offsetLeft - 75) return;
            var bullet = o.bullet();
            //console.log('shoot');
            //每30秒子弹移动11px
            bullet.runId = setInterval(function () {
                bullet.style.left = bullet.offsetLeft + 11 + "px";
                //遍历僵尸
                for (var i in jsGroup) {
                    var js = jsGroup[i];
                    if (!js.zombie) continue;
                    if (!o.plant) continue;
                    //僵尸位置在植物左侧时不射击
                    if ((js.zombie.offsetLeft + 35) < o.plant.offsetLeft - 75) continue;
                    //子弹射击到僵尸的时候
                    if (bullet.offsetLeft > js.zombie.offsetLeft + 55) {
                        clearInterval(bullet.runId);
                        bullet.runId = null;
                        bullet.src = "img/PeaBulletHit.gif";
                        setTimeout(function () {
                            if (bullet.parentNode != dzombies) return;
                            dzombies.removeChild(bullet);
                        }, 300);
                        if (js.blood >= 0) js.blood--;
                    }
                    //僵尸在植物右侧
                    if ((js.zombie.offsetLeft + 35) > (o.plant.offsetLeft + o.plant.offsetWidth) && js.blood >= 0 && o.blood >= 0) {
                        if (js.blood == 2) {
                            js.lostHead();
                            js.stopWalk();
                            js.noHeadWalk();
                        }else if (js.blood == 1) {
                            js.down();
                        }else if (js.blood == 0) {
                            js.die(dieJS);
                            o.stopShoot();
                            //去掉死亡僵尸
                            jsGroup.remove(js);
                            new_jsGroup = jsGroup;
                            //僵尸全部死亡时游戏通关
                            if (dieJS.length >= jsAll) {
                                if (jsAll < 8) {
                                    setTimeout(function () {
                                        alert("闯关成功！ \n点击以进入下一关");
                                        window.location.href = "game.html#" + (jsAll + 1);
                                        window.location.reload();
                                    }, 1000);
                                }else {
                                    gamePass();
                                }
                            }
                            //射击存活僵尸
                            o.shoot(new_jsGroup);
                        }
                        return false;
                    }else if ((js.zombie.offsetLeft + 35) <= (o.plant.offsetLeft + o.plant.offsetWidth) && js.blood >= 0 && o.blood >= 0) {
                        //僵尸靠近植物并吞噬植物
                        if (js.blood > 0) {
                            o.blood--;
                        }
                        //记录停止行走的僵尸数量
                        stopJs.push(js);
                        //去掉重复记录
                        stopJs.distinct();
                        if (js.blood > 2) {
                            js.eatPlant();
                        }else if (js.blood == 2) {
                            js.lostHead();
                            js.noHeadEatPlant();
                        }else if (js.blood == 1) {
                            js.down();
                        }else if (js.blood == 0) {
                            js.die(dieJS);
                            o.stopShoot();
                            jsGroup.remove(js);
                            new_jsGroup = jsGroup;
                            //僵尸全部死亡时游戏通关
                            if (dieJS.length >= jsAll) {
                                if (jsAll < 8) {
                                    setTimeout(function () {
                                        alert("闯关成功！ \n点击以进入下一关");
                                        window.location.href = "game.html#" + (jsAll + 1);
                                        window.location.reload();
                                    }, 1000);
                                }else {
                                    gamePass();
                                }
                            }
                            o.shoot(new_jsGroup);
                        }
                        if (o.blood == 0) {
                            o.stopShoot();
                            o.die();
                            //遍历停止行走的僵尸数组让其行走
                            for (var j in stopJs) {
                                if (stopJs[j].blood > 2) {
                                    stopJs[j].walk();
                                }
                                if (stopJs[j].blood == 2 ) {
                                    stopJs[j].noHeadWalk();
                                }
                            }
                            stopJs = [];
                        }
                    }
                }
            }, 30);
        };
        //2秒后创建一个子弹
        this.bulletRun = setInterval(new_shoot, o.buildShootSpeed);
    };
    //植物停止射击的方法
    Plant.prototype.stopShoot = function () {
        clearInterval(this.bulletRun);
        this.bulletRun = null;
    };
    //植物的死亡方法  139, 225, 310, 396, 482, 567, 653, 738, 824
    Plant.prototype.die = function () {
        this.stopShoot();
        //植物死亡位置可以种植植物
        if (this.plant.offsetLeft == 139) state[0] = false;
        if (this.plant.offsetLeft == 225) state[1] = false;
        if (this.plant.offsetLeft == 310) state[2] = false;
        if (this.plant.offsetLeft == 396) state[3] = false;
        if (this.plant.offsetLeft == 482) state[4] = false;
        if (this.plant.offsetLeft == 567) state[5] = false;
        if (this.plant.offsetLeft == 653) state[6] = false;
        if (this.plant.offsetLeft == 738) state[7] = false;
        if (this.plant.offsetLeft == 824) state[8] = false;
        plants.removeChild(this.plant);
    };












var BuildSun = function () {
        //创建阳光，随机在游戏界面的顶部掉落
        var sun = document.createElement("img");
        sun.src = "img/Sun.gif";
        sun.className = "sun";
        wrap.appendChild(sun);
        //sun出现在顶部随机位置
        sun.style.left = Math.random() * (wrap.offsetWidth - 78) + "px";
        sun.style.top = "-78px";
        //定义sun下落的动画以及终点位置随机
        var sunTop = Math.random() * (wrap.offsetHeight - 78);
        var t = 1;
        var autoPick = true;
        var sunDown = setInterval(function () {
            sun.style.top = sun.offsetTop + t + "px";
            if (sun.offsetTop >= sunTop) {
                clearInterval(sunDown);
                sunDown = null;
                //3秒后自动获取
                setTimeout(function () {
                    if (autoPick == true) {
                        sun.onclick();
                    }else {
                        wrap.removeChild(sun);
                    }
                }, 3000);
            }
        }, 30);
        //点击阳光
        sun.onclick = function () {
            //停止掉落
            if (sunDown != null) {
                clearInterval(sunDown);
            }
            //阳光飞向计分牌
            var a = sun.offsetTop - 17 + sun.offsetHeight / 2;//垂直方向移动距离
            var b = sun.offsetLeft - 110 + sun.offsetWidth / 2;//水平方向移动距离
            var c = Math.sqrt(a * a + b * b);//直线距离
            var speedX = b / c;
            var speedY = a / c;
            var speed = 20;
            var sunRun = setInterval(function () {
                sun.style.left = sun.offsetLeft - speed * speedX + "px";
                sun.style.top = sun.offsetTop - speed * speedY + "px";
                if (sun.offsetLeft <= 100 && sun.offsetTop <= 7) {
                    clearInterval(sunRun);
                    sunRun = null;
                    sun.style.left = "80px";
                    sun.style.top = "-20px";
                    //阳光在0.5秒就消失，计分牌分数累计
                    setTimeout(function () {
                        var sunScore = document.getElementById("sunScore");
                        num += 25;
                        sunScore.innerHTML = num;
                        var imgs = card.getElementsByTagName("img");
                        //分数大于等于100植物射手可购买
                        if (num >= 100 && imgs[1].style.visibility == "hidden") {
                            imgs[1].style.visibility = "visible";
                        }
                        if (sun.parentNode != wrap) return;
                        wrap.removeChild(sun);
                    }, 500);
                }
            }, 30);
        }
    };*/
