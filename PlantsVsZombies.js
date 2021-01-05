var gridObjects = {
   
    Home: 1,
    Grass: 2,
    ZombiesWall: 3,
   
};
var levelOneGrid = [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,2,2,2,2,2,2,2,2,2,3, 
                    1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,2,2,2,2,2,2,2,2,2,3, 
                    1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,2,2,2,2,2,2,2,2,2,3,
                    1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,2,2,2,2,2,2,2,2,2,3, 
                    1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,2,2,2,2,2,2,2,2,2,3, 
                    1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,2,2,2,2,2,2,2,2,2,3, 
                    1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,2,2,2,2,2,2,2,2,2,3, 
                    1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,2,2,2,2,2,2,2,2,2,3, 
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
    
    


