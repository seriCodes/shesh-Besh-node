var reportWindowSize =  function() {
    boardDivResize();
    boardSubDivsResize();
     resizeCheckers();
}

function boardDivResize(){
    bodyWidth =document.body.clientWidth;
    bodyHeight = document.documentElement.clientWidth/75;
    BoardDiv.style.width =  bodyWidth/70+"cm";
    BoardDiv.style.height = bodyHeight+"cm";
    BoardDivWidth = BoardDiv.style.width;
    BoardDivheight = BoardDiv.style.height;

    BoardDiv.style.backgroundSize= BoardDivWidth+" "+BoardDiv.style.height; 
    }

function boardSubDivsResize(){
        const boardGameColumns = 24;
        for(var divisionsCount =0; divisionsCount<boardGameColumns; divisionsCount++) {
            //position:relative; left: 0.75cm; top:0.5cm;
            subDivWidth =  document.getElementById(divisionsCount).style.width =parseInt(BoardDivWidth)*0.078+"cm";
            subDivheight =  document.getElementById(divisionsCount).style.height = parseInt(BoardDivheight)*0.47+"cm";
            
            document.getElementById(divisionsCount).style.position ="relative";
            document.getElementById(divisionsCount).style.left =parseInt(BoardDivWidth)*0.025+"cm";
            document.getElementById(divisionsCount).style.top =parseInt(BoardDivheight)*0.02+"cm";
            if(divisionsCount>5 && divisionsCount<12){
                        document.getElementById(divisionsCount).style.left +=4.9*parseInt(document.getElementById(divisionsCount).style.left)+"cm";
                  
            }
            if(divisionsCount>11 ){
                document.getElementById(divisionsCount).style.left =parseInt(BoardDivWidth)*(-1)*0.022+"cm";
                document.getElementById(divisionsCount).style.top =parseInt(BoardDivheight)*0.06+"cm";
    
            }
            if(divisionsCount>17 ){
                document.getElementById(divisionsCount).style.left =parseInt(BoardDivWidth)*(-1)*0.028+"cm";
    
            }
        }
            document.getElementById("whiteChecerksEaten").style.width = parseInt(BoardDivWidth)*(1-0.078*12)/2 +"cm";
            document.getElementById("whiteChecerksEaten").style.height =parseInt( BoardDivheight)*0.47+"cm";
            document.getElementById("whiteChecerksEaten").style.position ="relative";
            document.getElementById("whiteChecerksEaten").style.left =parseInt(BoardDivWidth)*(-1)*0.025+"cm";
    
            document.getElementById("whiteChecerksEaten").style.top =parseInt(BoardDivheight)*0.06+"cm";
    
            document.getElementById("blackChecerksEaten").style.width = parseInt(BoardDivWidth)*(1-0.078*12)/2 +"cm";
            document.getElementById("blackChecerksEaten").style.height = parseInt(BoardDivheight)*0.47+"cm";
            document.getElementById("blackChecerksEaten").style.position ="relative";
    
            document.getElementById("blackChecerksEaten").style.left =parseInt(BoardDivWidth)*0.025+"cm";
    
            document.getElementById("blackChecerksEaten").style.top =parseInt(BoardDivheight)*0.0195+"cm";
     }
function resizeCheckers(){
        //  BoardDiv.children[0].children[0].
           for(var i=0; i<checkersImageArrayNodeReference.length; i++){
           imageNode = checkersImageArrayNodeReference[i];
           // למה לא עובד- גישה 1- דרך האלמנט אבא
         //  parentImageNode = checkersImageArrayNodeReference[i].parentNode;
           //גישה 3- שימוש בקבוע
           imageNode.style.width=subDivWidth;
           imageNode.style.height=parseFloat(subDivheight)/6+ "cm";
        //סוף גישה 3
           } 
           // גישה 2
          //BoardDiv.children[0].children[0].style.width=parseFloat(BoardDiv.children[0].style.width)+ "cm";
       //   BoardDiv.children[0].children[0].style.height=parseFloat(BoardDiv.children[0].style.height)/6+ "cm";
           for(var i=0; i<BoardDiv.children.length; i++){
               // if(BoardDiv.children[i].contains(img)){
                    //numberOfCheckersImagesInColumn = BoardDiv.children[i].length; // לא עובד
                    numberOfCheckersImagesInColumn = BoardDiv.children[i].children.length;
                    for(var j=0; j<numberOfCheckersImagesInColumn; j++){
                        BoardDiv.children[i].children[j].style.width=parseFloat(BoardDiv.children[i].style.width)+ "cm";
                   // }

                }
           }


      }
