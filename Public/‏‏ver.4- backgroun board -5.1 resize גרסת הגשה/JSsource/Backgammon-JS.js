
function initialgame() {  
 
  //test();
 //alert(countOfTakenOutWhiteCheckers);

//  initialBodyElement();//not a good place before the return
//  initialBoardDivDivisions();//not a good place before the return
 //initialBoardAndCheckers();//not a good place before the return
 //resetAndCopyBoard();// not a good place before the return
 //let isWhiteStartsTheGame = whoStarts();//check needed-if 2 games starts simultnouosly it might corrupt the variable(?)
 
 //simulationData();
 
 //alert("Move checkers one dice at a time");
//  copyDice(); //not a good place before the return
 //whosTurnVisualised(); //not a good place before the return
 //checkersEatenVisualised();//// not a good place before the return
 return [{
     firstClickPosition:null,
    secondClickPosition:null,
    clicksCount:0,
    //moveCount:0,
    countOfWhiteCheckersEaten :0,
    countOfBlackCheckersEaten :0,
    countOfTakenOutWhiteCheckers :14,
    countOfTakenOutBlackCheckers :14,
    enterEatenCheckerPossible:false,
    oneTimeAlertTakeOutCheckrsInstruction:true,
    playerQuit:false,
    isDoubleDieAccepted : false,
    isDoubleDieKidnapped: false,
    diceThrowData:  throwDiceResultAndDoubleCheck(),//composed of an object with 3 properties(2 results & isDoubleVar)
    roomName:undefined,
    backgammonBoardArray:[],
    isWhiteTurn:whoStarts(),
    isItACheckAfterCompletingOnlyOneThrow:true,
    landPosition: null,
    initialPosition: null,
    moveDifference: null,
    isWinVar:null,
    countsChecksPossibleEntryposition:0,
    isPlayerJustTookOutAChecker:null,
   // doesThePlayerCanTakeOutCheckers:null,
},
     {
        isWhite: true,
     
    },
    //כל-סוקט-יישא-את-האובייקט-הייחודי-לו-בלבד
//     {
  
//        isWhite: false,
//        isWhiteTurn:isWhiteStartsTheGame,
//     //לשמור-מידע-זה-ברמת-הסוקט
//        //    isWon:undefined,
//     //    playerName: undefined
//           // id: socket.id,

//    }
]

    
    
}
function simulationData(){
 SimulationThrowDiceResultAndDoubleCheck();
 turnDecision();
}
function turnDecision(){
     input = prompt("w or b","");
     isWhiteTurn = input=="w"? true:false;
}
function SimulationThrowDiceResultAndDoubleCheck(){
    firstThrowResult = parseInt(prompt("firstThrowResult",""));
    secondThrowResult = parseInt(prompt("secondThrowResult",""));
    isDoubleVar = isDoubleAndChangeVariablesAccordingly();
    copyDice(gameData.diceThrowData.firstThrowResult, gameData.diceThrowData.secondThrowResult );
}

function throwDiceResultAndDoubleCheck(){
    let firstThrowResult= dieThrow();
    let secondThrowResult= dieThrow();
    return{
        firstThrowResult: firstThrowResult,
        secondThrowResult :secondThrowResult,
        isDoubleVar : isDoubleAndChangeVariablesAccordingly(firstThrowResult,secondThrowResult),

    }
    
   // alert("Dice result is ="+ firstThrowResult + " " + secondThrowResult);
}

//בוצע1
function initialBodyElement(){
    BoardDiv = document.createElement("div");

    document.body.style.border = "thick solid  green"
    BoardDiv.style.backgroundImage = "url('./backgammonBoardImg.gif')";
    BoardDiv.style.backgroundRepeat = "no-repeat";
    BoardDiv.style.border = "thick solid  blue";
    boardDivResize();

diceDiv =document.createElement("div");
whosTurnVisualizedHTML = document.createElement("div");
eatenWhiteVisualizedHTML = document.createElement("div");
eatenBlackVisualizedHTML = document.createElement("div");
doubleButtonVisualizedHTML = document.createElement("input");

// socketImportedScriptTag = document.createElement("script");
// socketImportedScriptTag.setAttribute("src", "/socket.io/socket.io.js");
//  socketSelfManagedScriptTag = document.createElement("script");
// socketSelfManagedScriptTag.setAttribute("src", "socket.ioSelfManaged.js");
makeMoveScript = document.createElement("script");
makeMoveScript.setAttribute("src", "makeMove.js");

eventsScript = document.createElement("script");
eventsScript.setAttribute("src", "eventsScript.js");

buttonsocketCheck = document.createElement("input");

buttonsocketCheck.setAttribute("type", "button");
buttonsocketCheck.setAttribute("value", "socketCheckbutton");
buttonsocketCheck.setAttribute("id", "checkSocketConnection");

//buttonsocketCheck.setAttribute("onclick", "socketCheck()");


doubleButtonVisualizedHTML.setAttribute("type", "button");
doubleButtonVisualizedHTML.setAttribute("value", "DOUBLE");
doubleButtonVisualizedHTML.setAttribute("onclick", "doubleTrilema()");


document.body.appendChild(BoardDiv);
document.body.appendChild(diceDiv);
document.body.appendChild(whosTurnVisualizedHTML);
document.body.appendChild(eatenWhiteVisualizedHTML);
document.body.appendChild(eatenBlackVisualizedHTML);
document.body.appendChild(doubleButtonVisualizedHTML);

document.body.appendChild(buttonsocketCheck);

//document.body.appendChild(socketImportedScriptTag);
// document.body.appendChild(socketSelfManagedScriptTag);
document.body.appendChild(makeMoveScript);

document.body.appendChild(eventsScript);
}

//הרחבות
function doubleTrilema(){
    var result = prompt("Enter \"I Accept\" to accept. \n Enter \"I am a QUITTER\" to quit or... \n \"bring it ON\" to kidnap the Double)", "be brave!\n I Accept\nI am a QUITTER \n bring it ON");

    switch(result) {
        case "I Accept":
            isDoubleDieAccepted=true;
        break;
        case "I am a QUITTER":
        playerQuit=true;
    break;
    case "bring it ON":
        isDoubleDieAccepted=true
        isDoubleDieKidnapped=true;
    break;      
    default:
    alert("Incorrect input")    
    doubleTrilema();

}
if(playerQuit){
            document.location.reload();
        }
}
  //בוצע1
function checkersEatenVisualised(countOfWhiteCheckersEaten,countOfBlackCheckersEaten){
    eatenWhiteVisualizedHTML.innerHTML= "white checkers have been eaten: "+ countOfWhiteCheckersEaten;
    eatenBlackVisualizedHTML.innerHTML= "black checkers have been eaten: "+countOfBlackCheckersEaten;

}
//בוצע1
function whosTurnVisualised(isWhiteTurn){
    let playerTurn = isWhiteTurn? "white turn":"black turn";
    whosTurnVisualizedHTML.innerHTML= playerTurn;
}
//בוצע1
function whoStarts(){
    // //simulation
    // return false;
    ///////////////
    let whiteThrowResult = dieThrow();
    let blackThrowResult = dieThrow();
    if(whiteThrowResult == blackThrowResult){
        whoStarts();//it's recursion! replace with do-while.
    }
  if(whiteThrowResult>blackThrowResult){
    
    isWhiteTurn= true;
    return true
    
  }else{
    isWhiteTurn= false;
    return false
  }
  // alert("whiteThrew="+whiteThrowResult + "blackThrew=" + blackThrowResult);

}
function dieThrow(){
    var randomNumber = Math.random()*6 +1;
    let dieResult =  Math.floor(randomNumber);
    return dieResult;
}
//בוצע1
function copyDice(firstThrowResult,secondThrowResult ){
    
    diceDiv.innerHTML ="first:"+ firstThrowResult + " second:"+ secondThrowResult;
}

function drag(ev) {
    alert("drag is happening")
    makeMove(ev);
  }
  function allowDrop(ev){
    ev.preventDefault();
}
function drop(ev) {
    makeMove(ev);
  }
//בוצע1
function initialBoardDivDivisions(){
    
    BoardDiv.setAttribute("class", "board");
    var divReference = document.createElement("div");
        divReference.setAttribute("class", "baseStyleDataRow");
        divReference.setAttribute("onclick", "makeMove(event)");
        divReference.setAttribute("ondragover", "allowDrop(event)");
        divReference.setAttribute("ondrop", "drop(event)");
       // divReference.setAttribute("ondragstart", "drag(event)");//ניסיון להקבלה בין הדיב לדמקה בזמן האיונט- לא עובד.

        
    for(var divisionsCount =0; divisionsCount<24; divisionsCount++) {        
        checkersDivision= divReference.cloneNode();
       // checkersDivision.innerHTML=divisionsCount;
        if(divisionsCount>5 && divisionsCount<12){
            checkersDivision.classList.add("secondSection");
        } 
        if(divisionsCount===6 || divisionsCount===18){
            divEaten = divReference.cloneNode();
            divEaten.setAttribute("onclick", "eventClickHandlerEatenDivisions(event)");
            if(divisionsCount===18){
                divEaten.classList.add("secondRow");                    
                divEaten.id = "whiteChecerksEaten";
            }else{
                divEaten.id = "blackChecerksEaten";
            }

            divEaten.classList.add("eatenDiv");
            BoardDiv.appendChild(divEaten);
        
        }

        if(divisionsCount===12){
            
            divclearFloat = document.createElement("div");
            
            divclearFloat.id = "clearFloat";
            BoardDiv.appendChild(divclearFloat);
                }
        if(divisionsCount>11 ){
            checkersDivision.classList.add("secondRow");
            }              
        if(divisionsCount>17){
                checkersDivision.classList.add("secondSectionforSecondRow");
                }  
            
            
            checkersDivision.id= divisionsCount;

            BoardDiv.appendChild(checkersDivision);

}
boardSubDivsResize();
    }
    //בוצע1
function initialBoardAndCheckers(backgammonBoard){
    // var checkers = {
    //     isWhite: undefined,
    //     location: undefined,
    //     checkersAmountCount:undefined,        
    // };
    function Checkers(isWhite,checkersAmountCount){
        this.isWhite=isWhite;
       // this.location=location;
        this.checkersAmountCount=checkersAmountCount;

};
/*
backgammonBoard =[
    new Checkers(true,2), new Checkers(false,1),new Checkers(false,1) ,
     new Checkers(false,1),new Checkers(false,1) ,new Checkers(false,5)
      ,new Checkers(undefined,0), new Checkers(false,3),new Checkers(undefined,0)
       , new Checkers(undefined,0), new Checkers(undefined,0), new Checkers(true,5),
       
        new Checkers(false,5), new Checkers(undefined,0),new Checkers(undefined,0) ,
        new Checkers(undefined,0), new Checkers(true,3) ,new Checkers(undefined,0)
         ,new Checkers(true,5), new Checkers(true,2),new Checkers(true,2)
          , new Checkers(true,2), new Checkers(true,2), new Checkers(false,2),
 ];
 */
//backgammonBoard = [];//initialized in the argument that was sent
for (var i=0; i<24; i++){
    backgammonBoard[i]= new Checkers(undefined,0);
}
//initCheckers(backgammonBoard);
simulationBoard(backgammonBoard);
}

function simulationBoard(backgammonBoard){
    // backgammonBoard[23].isWhite=true;
    // backgammonBoard[23].checkersAmountCount=3;
    // // backgammonBoard[1].isWhite=false;
    // // backgammonBoard[1].checkersAmountCount=1;
    // // backgammonBoard[2].isWhite=false;
    // // backgammonBoard[2].checkersAmountCount=1;

    // backgammonBoard[0].isWhite=false;
    // backgammonBoard[0].checkersAmountCount=3;


  
    backgammonBoard[0].isWhite=false;
    backgammonBoard[0].checkersAmountCount=8;
    backgammonBoard[1].isWhite=false;
    backgammonBoard[1].checkersAmountCount=2;
    backgammonBoard[2].isWhite=false;
    backgammonBoard[2].checkersAmountCount=2;
    backgammonBoard[3].isWhite=false;
    backgammonBoard[3].checkersAmountCount=2;
    backgammonBoard[4].isWhite=false;
    backgammonBoard[4].checkersAmountCount=1;
    backgammonBoard[5].isWhite=false;
    backgammonBoard[5].checkersAmountCount=1;

    backgammonBoard[18].isWhite=true;
    backgammonBoard[18].checkersAmountCount=1;
    backgammonBoard[19].isWhite=true;
    backgammonBoard[19].checkersAmountCount=7;
    backgammonBoard[20].isWhite=true;
    backgammonBoard[20].checkersAmountCount=2;
    backgammonBoard[21].isWhite=true;
    backgammonBoard[21].checkersAmountCount=3;
    backgammonBoard[22].isWhite=true;
    backgammonBoard[22].checkersAmountCount=2;
    backgammonBoard[23].isWhite=true;
    backgammonBoard[23].checkersAmountCount=1;
    
 
     /*
    backgammonBoard[0].isWhite=true;
    backgammonBoard[0].checkersAmountCount=2;
    backgammonBoard[1].isWhite=true;
    backgammonBoard[1].checkersAmountCount=0;
    backgammonBoard[2].isWhite=true;
    backgammonBoard[2].checkersAmountCount=2;
    backgammonBoard[3].isWhite=true;
    backgammonBoard[3].checkersAmountCount=2;
    backgammonBoard[4].isWhite=true;
    backgammonBoard[4].checkersAmountCount=2;
    backgammonBoard[5].isWhite=false;
    backgammonBoard[5].checkersAmountCount=1;
    backgammonBoard[6].isWhite=true;
    backgammonBoard[6].checkersAmountCount=6;
    backgammonBoard[7].isWhite=false;
    backgammonBoard[7].checkersAmountCount=6;
    backgammonBoard[20].isWhite=undefined;
    backgammonBoard[20].checkersAmountCount=0;
   */
  /*
    backgammonBoard[0].isWhite=true;
    backgammonBoard[0].checkersAmountCount=1;
   // backgammonBoard[1].isWhite=false;
    backgammonBoard[1].checkersAmountCount=0;
    backgammonBoard[2].isWhite=false;
    backgammonBoard[2].checkersAmountCount=2;
    backgammonBoard[3].isWhite=false;
    backgammonBoard[3].checkersAmountCount=2;
    backgammonBoard[4].isWhite=false;
    backgammonBoard[4].checkersAmountCount=2;
    backgammonBoard[5].isWhite=false;
    backgammonBoard[5].checkersAmountCount=3;
    /*backgammonBoard[6].isWhite=false;
    backgammonBoard[6].checkersAmountCount=6;
    backgammonBoard[7].isWhite=false;
    backgammonBoard[7].checkersAmountCount=6;
    
    backgammonBoard[20].isWhite=true;
    backgammonBoard[20].checkersAmountCount=1;
*/
    /*
    
    backgammonBoard[0].isWhite=true;
    backgammonBoard[0].checkersAmountCount=1;
    backgammonBoard[1].isWhite=false;
    backgammonBoard[1].checkersAmountCount=1;
    backgammonBoard[5].isWhite=false;
    backgammonBoard[5].checkersAmountCount=0;
    backgammonBoard[3].isWhite=false;
    backgammonBoard[3].checkersAmountCount=0;
    backgammonBoard[2].isWhite=false;
    backgammonBoard[2].checkersAmountCount=1;
   // backgammonBoard[16].isWhite=true;
   // backgammonBoard[16].checkersAmountCount=3;
    backgammonBoard[22].isWhite=true;
    backgammonBoard[22].checkersAmountCount=1;
    backgammonBoard[18].isWhite=true;
    backgammonBoard[18].checkersAmountCount=1;
    */

}
    //בוצע1
function initCheckers(backgammonBoard){
    backgammonBoard[0].isWhite=false;
    backgammonBoard[0].checkersAmountCount=13;

    backgammonBoard[1].isWhite=false;
    backgammonBoard[1].checkersAmountCount=1;
    
    backgammonBoard[2].isWhite=false;
    backgammonBoard[2].checkersAmountCount=1;
    backgammonBoard[3].isWhite=null;
    backgammonBoard[3].checkersAmountCount=0;
    backgammonBoard[4].isWhite=null;
    backgammonBoard[4].checkersAmountCount=0;
    backgammonBoard[5].isWhite=null;
    backgammonBoard[5].checkersAmountCount=0;

    // backgammonBoard[11].isWhite=true;
    // backgammonBoard[11].checkersAmountCount=5;
    // backgammonBoard[16].isWhite=true;
    // backgammonBoard[16].checkersAmountCount=3;
    backgammonBoard[18].isWhite=true;
    backgammonBoard[18].checkersAmountCount=4;
    backgammonBoard[19].isWhite=true;
    backgammonBoard[19].checkersAmountCount=4;
    backgammonBoard[20].isWhite=true;
    backgammonBoard[20].checkersAmountCount=2;
    backgammonBoard[21].isWhite=true;
    backgammonBoard[21].checkersAmountCount=1;
    backgammonBoard[22].isWhite=true;
    backgammonBoard[22].checkersAmountCount=1;
    backgammonBoard[23].isWhite=true;
    backgammonBoard[23].checkersAmountCount=3;
    // backgammonBoard[12].isWhite=false;
    // backgammonBoard[12].checkersAmountCount=5;
    // backgammonBoard[7].isWhite=false;
    // backgammonBoard[7].checkersAmountCount=3;
    // backgammonBoard[5].isWhite=false;
    // backgammonBoard[5].checkersAmountCount=5;
    
return backgammonBoard;
}
/*function visualBoardMove(firstClickPosition, secondClickPosition){
    initialPosition =  document.getElementById(firstClickPosition);
    landingPosition = document.getElementById(secondClickPosition);
    var oldChild = initialPosition.removeChild(initialPosition.childNodes[0]);
    landingPosition.appendChild(oldChild);
}
*/
    //בוצע12
function resetAndCopyBoard(backgammonBoard,countOfWhiteCheckersEaten,countOfBlackCheckersEaten){
        
whiteChecker =document.createElement("img");
whiteChecker.src="./imgSource/circle-white.png";
whiteChecker.width= 60;
whiteChecker.height= 60;
whiteChecker.alt="white checker" ;
//whiteChecker.draggable = "true";
whiteChecker.setAttribute("ondragstart", "drop(event)");

//whiteChecker.ondragstart="drag(event)";




blackChecker =document.createElement("img");
blackChecker.src="./imgSource/circle-black.png";
blackChecker.width= 60;
blackChecker.height= 60;
blackChecker.alt="black checker";
//blackChecker.draggable = "true";
// blackChecker.ondragstart="drag(event)";
blackChecker.setAttribute("ondragstart", "drop(event)");

checkersImageArrayNodeReference= [];


for(var positionInArray =0; positionInArray<backgammonBoard.length; positionInArray++) {
    divReference =  document.getElementById(positionInArray);
    divReference.innerHTML="";
}
continueAddCheckers= true;

eatenCheckersDivNodeCreation("whiteChecerksEaten", countOfWhiteCheckersEaten, whiteChecker);
continueAddCheckers= true;
eatenCheckersDivNodeCreation("blackChecerksEaten",countOfBlackCheckersEaten,blackChecker );
continueAddCheckers= true;

    for(var positionInArray =0; positionInArray<backgammonBoard.length; positionInArray++) {
        divReference =  document.getElementById(positionInArray);
        continueAddCheckers = true;
        var checkersAmountCountVariable = backgammonBoard[positionInArray].checkersAmountCount;
        if(checkersAmountCountVariable>0){                           
                    for(var i =0; i<checkersAmountCountVariable && continueAddCheckers; i++){
                        if(backgammonBoard[positionInArray].isWhite){
                            checkersImageArrayNodeReference.push(divReference.appendChild(whiteChecker.cloneNode()));/////////////////////////test
                    }
                    if(!backgammonBoard[positionInArray].isWhite){
                        checkersImageArrayNodeReference.push(divReference.appendChild(blackChecker.cloneNode()));
                    }
                        if(i>3){
                            stopAddCheckerImages(backgammonBoard[positionInArray].checkersAmountCount)           
                
            }
            }

        }
            

    }

    resizeCheckers();
}
    //בוצע1
function eatenCheckersDivNodeCreation(idOfEatenCheckers, countOfCheckersEaten=0,imageCheckerNode){//0 is default
    divReference =  document.getElementById(idOfEatenCheckers+"");
    while (divReference.firstChild) {
        divReference.removeChild(divReference.firstChild);
}
 
    eatenImageNodeCreation(countOfCheckersEaten,imageCheckerNode);   
}
    //בוצע1
function eatenImageNodeCreation(countOfCheckersEaten,imageCheckerNode){
if(countOfCheckersEaten>0){
    for(var i = 0; i<countOfCheckersEaten && continueAddCheckers; i++){
        checkersImageArrayNodeReference.push(divReference.appendChild(imageCheckerNode.cloneNode()));
        if(i>3){
            stopAddCheckerImages(countOfCheckersEaten)    
}
    }
        
}
}
//בוצע1
function stopAddCheckerImages(checkersAmountTooBigToPresent){
  //   divReference.innerHTML +="the amount is" +checkersAmountTooBigToPresent;// !!! זה משבש את ריסייז לדמקות!!!!!!!! צריך להוסיף אלמנט
  var textnode = document.createTextNode(checkersAmountTooBigToPresent);         // Create a text node
  divReference.appendChild(textnode);   
     continueAddCheckers= false;    
}


function isACheckForTakingOutCHeckeroutTheBoard(gameData){
    if(isConditionToTakeOutCheckers(gameData)){
        if(gameData.isWhiteTurn &&((gameData.moveDifference<gameData.diceThrowData.firstThrowResult)||
        ( gameData.moveDifference<gameData.diceThrowData.secondThrowResult))
        ){
            return true;   
        }
        if(!gameData.isWhiteTurn &&((gameData.moveDifference>gameData.diceThrowData.firstThrowResult)||
        ( gameData.moveDifference>gameData.diceThrowData.secondThrowResult))
        ){
            return true;   
        }        
    }
    return false;

}


/*function eatenCheckersExistence(){
    isEatenCheckersExist =  isEatenCheckersExistForTheMovingPlayer(isWhiteTurn);
    return isEatenCheckersExist? true: false;
}*/


function setLandingPosition(gameData, requestSourceAndDirective){
    if( requestSourceAndDirective){
        return gameData.isWhiteTurn? 25:0;
    }else{
        return gameData.secondClickPosition +1;
    } 
}
function setInitialPosition(gameData){
    if(isEatenCheckersExistForTheMovingPlayer(gameData) ){
        return gameData.isWhiteTurn? 0:25;
    }else{
        return gameData.firstClickPosition +1;
    } 
}





////?????מה-זה
function isPositionPossibleByDiceThrowsFortakingOutCheckers(gameData){
    if(gameData.backgammonBoardArray[firstClickPosition].isWhite!==gameDataisWhiteTurn ){// פוסל לחיצה על מקומות ריקים או של השקן היריב.
        alert("click on your own checkers");
        return false;
    }else{

        if(gameData.firstClickPosition-gameData.landPosition ) {       
        //clickedPositionAdjustedForTakingoutCheckers = 
        //setClickPosition();
        
    }
}
}
/*function setClickPosition(){
    if(isWhiteTurn){
        return firstClickPosition+1;
    }
*/


function enterEatenCheckers(gameData, secondClickPosition,isWhiteTurn){
    console.log('enterEatenCheckers')
    console.log(gameData)
    gameData.enterEatenCheckerPossible= false;
    gameData.isWhiteTurn?gameData.countOfWhiteCheckersEaten--: gameData.countOfBlackCheckersEaten--;
    setlandingPositionArray(gameData);

}
function eventClickHandlerEatenDivisions(event){
    let gameData = socket.gameObject[0]
     let isWhitePlayerAttemptMakeMoveEvent = socket.gameObject[1].isWhite;
    if(gameData.isWhiteTurn!==isWhitePlayerAttemptMakeMoveEvent){
        alert("wait your turn")
        return
    }
    if(isPlayerTurnAndHasEatenCheckers(gameData)){
        gameData.clicksCount++;
        gameData.enterEatenCheckerPossible= true;
    }else{
        alert("no eaten checkers to click here");
    }
    

}
function removeCheckerFromArrayAndIncreaseEatenCountVariable(gameData){
    gameData.backgammonBoardArray[gameData.secondClickPosition].checkersAmountCount--;
    gameData.backgammonBoardArray[gameData.secondClickPosition].isWhite=undefined;
    gameData.isWhiteTurn? gameData.countOfBlackCheckersEaten++: gameData.countOfWhiteCheckersEaten++;

}
function isLandingPositionHasRivalSingularTool(gameData){

if(gameData.backgammonBoardArray[gameData.secondClickPosition].checkersAmountCount ===1 && 
    gameData.backgammonBoardArray[gameData.secondClickPosition].isWhite !== gameData.isWhiteTurn){//אכילה
    return true;
}
return false
}
function isLandingPositionFreeFromRivalMultipleTools(gameData,positionCheck){
    if(gameData.backgammonBoardArray[positionCheck].isWhite !== gameData.isWhiteTurn){

        if(  gameData.backgammonBoardArray[positionCheck].checkersAmountCount >1 ){// סיבות הסטוריות לפיצול התנאים- לאחד אח"כ
            return false;
        }
    }
    return true;
}
 

function setlandingPositionArray(gameData){
    console.log(gameData)
    gameData.backgammonBoardArray[gameData.secondClickPosition].checkersAmountCount++;
    gameData.backgammonBoardArray[gameData.secondClickPosition].isWhite= gameData.isWhiteTurn;
}

function moveCheckersArray(gameData ) {  
     
    reduceInitialCheckerPosition(gameData);
   
    setlandingPositionArray(gameData);       
}
function isDoubleAndChangeVariablesAccordingly(firstThrowResult,secondThrowResult){
    if(firstThrowResult===secondThrowResult){
        return{
            moveCount:-2,
            isdouble:true,
        } 
    }
    return {
        moveCount:0,
        isdouble:false,
    }
}
function nextPlayerTurn(gameData){
    //תוספת-סוקטים
    gameData.countsChecksPossibleEntryposition=0;
    //תוספת-סוקטים
    gameData.diceThrowData.isDoubleVar.moveCount=0;
    if(gameData.diceThrowData.isDoubleVar.isdouble){// ייתכן והתנאי עצמו מיותר ואפשר להשאיר רק את ההשמה.
        gameData.diceThrowData.isDoubleVar.isdouble=false;
    }
    gameData.isWinVar= isWin(gameData)

    if(!gameData.isWinVar){
    gameData.diceThrowData= throwDiceResultAndDoubleCheck();  
    socket.emit('showDiceOnScreen',gameData)
    gameData.isWhiteTurn = !gameData.isWhiteTurn; 
     //simulationData();
    // copyDice(gameData.diceThrowData.firstThrowResult, gameData.diceThrowData.secondThrowResult );
    // whosTurnVisualised(gameData.isWhiteTurn);
     //checkersEatenVisualised(); הורדתי מפה כי אני רוצה שיראה אחרי כל מהלך שמשוחק.
    gameData.isItACheckAfterCompletingOnlyOneThrow = false;
    socket.emit('overwriteGameDataObjecetInOpponentSocket',gameData)
let isPoosibleToEnterEatenCheckersImmediatelyAfterDiceThrow=isbringInEatenCheckersFeasible(gameData)
   if(!isPoosibleToEnterEatenCheckersImmediatelyAfterDiceThrow|| !checkPossibilityToCompleteTheRemainingMoves(gameData,)){
  // socket.emit('cantMakeMove')
  socket.emit('notPossibleToEneterAlert',gameData)
    gameData.diceThrowData= throwDiceResultAndDoubleCheck();
    socket.emit('showDiceOnScreen',gameData)
   
    gameData.isWhiteTurn = !gameData.isWhiteTurn;  
    gameData.isItACheckAfterCompletingOnlyOneThrow = false;
    socket.emit('overwriteGameDataObjecetInOpponentSocket',gameData)   
       //רקורסיה-שצריך-לשנות
   } // לא יבדוק את הפו' השניה אם הראשונה היא טרו
    //בדיקה אם שחקן יכול לזוז או להוציא דמקות לפני תחילת כל תור checkPossibilityToCompleteTheRemainingMoves();    
    //או-בדיקה-אם-להכניס-דמקות

    //???remainmoves...emit...alert 
    }else{
        socket.emit('rateWinnerUp',socket.token);
        socket.emit('eraseRoom',socket.roomName);

        alert('you won')    
            
        //העלאת-רייטינטגשחקן-ומחיקת-חדר
        //document.location.reload();
    }  
    return; 
}
//
function isbringInEatenCheckersFeasible(gameData){
    if(isEatenCheckersExistForTheMovingPlayer(gameData)){
        if(!isItpossibleToEnterEAtenChecker(gameData)){// טרו אם יאן אפשרות להיכנס עם הדמקות האכולות
            
            socket.emit('notPossibleToEneterAlert',gameData)
               // alert("Not possible to enter");
       //     gameData.isItACheckAfterCompletingOnlyOneThrow=false;
            nextPlayerTurn(gameData);
            return false;
        }else{
          //  alert("You can get inside. plaese make your FIRST click on the eaten cheker")
            return true;
        }
    }
//תוספת-לאחר-סוקטים-מתאימה-למשתנה:
//isPoosibleToEnterEatenCheckersImmediatelyAfterDiceThrow
//מקווה-שלא-מחרבש-שום-דבר-אחר
    return true;

}
function checkPossibilityToCompleteTheRemainingMoves(gameData){
        if(gameData.isItACheckAfterCompletingOnlyOneThrow){
            if(isbringInEatenCheckersFeasible(gameData)){
                // //תוספת-לאחר-סוקטים
                // gameData.isItACheckAfterCompletingOnlyOneThrow = false;
                // //סוף-תוספת
                return true;
                
            }
            //תוספת-לאחר-סוקטים - בוטל-הדרך-הטובה-להעברת-התור-היא-בתוך-הisbringInEatenCheckersFeasible
            // else{
            //     nextPlayerTurn(gameData);       
            //     return false;
            // }
            //סוף-תוספת
        }
        gameData.isItACheckAfterCompletingOnlyOneThrow = false;
      //  console.log(gameData)
    if(!(isThrowEnableMovement(gameData, gameData.diceThrowData.firstThrowResult) || isThrowEnableMovement(gameData, gameData.diceThrowData.secondThrowResult))){// לא יכול לקרות במצב בו יש דמקה אכולה
        if(isConditionToTakeOutCheckers(gameData)){//בודק אם הדמקות יכולות לצאת מהמשחק למרות שהן  לא יכולות לזוז בתוך המשחק
           //בדיקה עבור כל דמקה שנמצאת בבית של השחקן 
           if(isPlayerHaveAPossibilityToTakeOutAChecker(gameData)){
              // alert("YES possible to complete the throws- can isPlayerHaveAPossibilityToTakeOutAChecker ");
           }else{
            alert("Not possible to complete the throws bc no isPlayerHaveAPossibilityToTakeOutAChecker");
            nextPlayerTurn(gameData);        
           }


        }else{
            alert("not possible to complete the throws bc no isConditionToTakeOutCheckers");
            nextPlayerTurn(gameData);        
        }
    }

    //תוספת-לאחר-סוקטים
    return true;
    //סוף-תוספת
}
//בוצע1
function isPlayerHaveAPossibilityToTakeOutAChecker(gameData){
    let LandingPositionCheckForUnableMovingPlayer=true;
    gameData.landPosition = setLandingPosition(gameData, LandingPositionCheckForUnableMovingPlayer);// צריך משתנה בלוייאני - לאפס לפני ואחרי השליחה משתנה בולייאני
          
   let checkStartPoint= gameData.isWhiteTurn? 18:0;
   let  checkEndPoint=gameData.isWhiteTurn? 24:6;

     for(var i = checkStartPoint; i<checkEndPoint; i++){
        if(gameData.backgammonBoardArray[i].isWhite == gameData.isWhiteTurn){
         ///////לשנות-פונ'-קביעת-מיקום-התחלתי!
            gameData.initialPosition = i+1 ;   // לא צריך משתנה בלוייאני אבל צריך להשתנות בהתאם למיקום דמקה
//the let was added after i cacelled the varible to be global-it might do harm 
        let isLandingPositionLegitAccordingToDiceThrows = positionPossibleByDiceThrows(gameData,gameData.diceThrowData.firstThrowResult,gameData.diceThrowData.secondThrowResult);//אין צורך לאפס משתנה כי הוא תמיד מאותחל מחדש לפני שימוש
             
             if((isLandingPositionLegitAccordingToDiceThrows&& !(isThereACheckerAboveTheClickedChecker(gameData)))
             //-תוספת-סוקטים-למטה
             ||isCheckersBeneathDiceResultsInPlayersBase(gameData) ){
                 LandingPositionCheckForUnableMovingPlayer=false;   
                 return true;
                  }  
             LandingPositionCheckForUnableMovingPlayer=false;                     
             }            
      
 }
 return false;
     }
function isCheckersBeneathDiceResultsInPlayersBase(gameData) {
var firstThrowResult= gameData.diceThrowData.firstThrowResult;
var secondThrowResult= gameData.diceThrowData.secondThrowResult;
var whoseTurn = gameData.isWhiteTurn;
var endPosition;
var checkerPositionToCheck;
if(whoseTurn){
    endPosition=23
    for(var i= 23; i<=18; i--){
        if(gameData.backgammonBoardArray[i].isWhite==whoseTurn ){
            checkerPositionToCheck=24-i
            if(checkerPositionToCheck<firstThrowResult||checkerPositionToCheck<secondThrowResult){
                return true;
            }
        }
    }
    return false;

}else{
    endPosition=0;
    for(var i= 0; i<=5; i++){
        if(gameData.backgammonBoardArray[i].isWhite==whoseTurn ){
            checkerPositionToCheck=i+1
            if(checkerPositionToCheck<firstThrowResult||checkerPositionToCheck<secondThrowResult){
                return true;
            }
        }
    }
    return false;

}


}

/* ...................מקרה קצה של אפשרות להוציא דמקה אבל אין אפשרות לזוז.........שאלה לטל....................................
function getPoitionsOfThePlayerCheckersAtHisBase(){
    checkStartPoint= isWhiteTurn? 18:0;
    checkEndPoint= isWhiteTurn? 24:6;

    for(var i = checkStartPoint; i<checkEndPoint; i++){
       if(backgammonBoard[i].isWhite == isWhiteTurn){
           return i;
       }
    }
    return false;
}*/
//רלוונטי-רק-לדמקות-במשחק-ללא-דמקות-אכולות
function isThrowEnableMovement(gameData, throwCheck){///דרוש-שינוי-פנימי-וארגומנט-גיים-דאטה
  if( isNaN(throwCheck)){
        return false;
    }
    for(var i= 0; i<gameData.backgammonBoardArray.length; i++){
        if(gameData.backgammonBoardArray[i].isWhite===gameData.isWhiteTurn){
           let directionAndStepsToMoveCheck= gameData.isWhiteTurn? +throwCheck:-throwCheck;
            var postionCheck = i+directionAndStepsToMoveCheck;
            if(postionCheck<=23 && postionCheck >=0 && isLandingPositionFreeFromRivalMultipleTools(gameData,postionCheck)){
             return true;
             }            
        }
    }
    return false;

}



// function typeOfWin(gameData){    
//     let pointsWin = 1; 
//     let winningPlayer = gameData.isWhiteTurn? "white":"black";
//    let winType = "regular";//ברירת מחדל היא ניצחון רגיל ולכן אותו לא בודקים
    
//     if((gameData.isWhiteTurn && gameData.countOfTakenOutBlackCheckers==0)||
//     (!gameData.isWhiteTurn && gameData.countOfTakenOutWhiteCheckers==0)){        
//         winType = "mars"
//         pointsWin = 2; 
//         if(isOpponentplayerHasCheckersAtRivalBase(gameData)){
//             winType = " Turkish mars"
//             pointsWin = 3;             
//         }
//     }

//     if(gameData.isDoubleDieAccepted)  {
//         pointsWin*=2;
//         if(gameData.isDoubleDieKidnapped)  {          
//             pointsWin*=2;
//       }
    
//         }
        
//        alert(winningPlayer+" Wins" + winType+ " win"+pointsWin);
  
        
// }

function isOpponentplayerHasCheckersAtRivalBase(gameData){
    //לא-בשימוש-עד-שאחזיר-לחיים
    //function typeOfWin
   let checkStartPoint= gameData.isWhiteTurn? 18:0;
  let   checkEndPoint= gameData.isWhiteTurn? 24:6;
    let opponentPlayerToCheck = !gameData.isWhiteTurn;
     for(var i = checkStartPoint; i<checkEndPoint; i++){
        if(gameData.backgammonBoardArray[i].isWhite == opponentPlayerToCheck){
            return true;
        }
     }
     return false;
}



window.onload = (event) =>{
    console.log("backgammon room loaded")// doesn;t work
    //let a=  document.getElementById(positionInArray);

//console.log(a)
}
window.addEventListener('load', (event) => {
    console.log('page is fully loaded');
    

  });
  document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
});
