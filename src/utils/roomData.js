const rooms=[];
const getRoomNameCountPlayers = (roomName2) => {
    console.log("check getRoomNameCountPlayers from utils")
    console.log(rooms)
    console.log(roomName2)

    roomFound= rooms.find(room => room.name === roomName2);
    console.log(roomFound)//continue to prevent rooms entering 3 playes

    if(roomFound){
            return roomFound.countPlayers;
    }else{
        return 0;
    }   
}

const createNewRoom = (roomName2) => {
    console.log("create new room")
  
    const roomObject={
        name:roomName2,
        countPlayers:1
    };
    rooms.push(roomObject)  
    console.log("new rooms array")
    console.log(rooms)
}

const joinExistingRoom = (roomName2) => {
    console.log("join room")
    roomFound= rooms.find(room => room.name === roomName2);
    roomFound.countPlayers++
    console.log("new rooms array")
    console.log(rooms)
}

const eraseRoomFromArray = (roomName2) => {
    console.log("eraseRoomFromArray start")
    roomFoundIndex= rooms.findIndex(room => room.name === roomName2);
    rooms.splice(roomFoundIndex,1)
    console.log("eraseRoomFromArray- end")
    console.log(rooms)
}


// 

module.exports = {
   // roomNameFunction,
    getRoomNameCountPlayers,
    createNewRoom,
    joinExistingRoom,
    eraseRoomFromArray,
    rooms
}



// const roomNameFunction = (roomName2) => {
    //     console.log("check roomData from utils")
    //    roomFound= rooms.find(room => room.name === roomName2)
    //    console.log("roomFound is:")
    //    console.log(roomFound)
    
    // //    if(roomFound){
    // //         if(roomFound.countPlayers==2){
    // //             console.log("room has 2 players-server")
    
    // //             return {error:"room already has 2 players",success:false}   
    //         // }else{
    //         //     roomFound.countPlayers++
    //         //     //init game
    //         //     console.log(roomFound)
    
    //         //     return {error:false,success:"second player entered"}   
    
    //         // }
    
    // //    }else{
        
    
    //     return({error:false,success:"wait for second player"}) 
    // }   
    
    
    // // }



     // switch(roomFound.countPlayers){
    //         case undefined: 
    //         return {
    //             error:false ,
    //             success:"new room needed" 
    //         }           
 
    //         case 1: return{
    //             error:false ,
    //             success:"new room needed" 
    //         },
    //         case 2: return {
    //             error:false ,
    //             success:"new room needed" 
    //         }
    // }
    
    // if(roomFound.countPlayers==2){
    //     console.log("room has 2 players-server")
    //     return {error:"room already has 2 players",success:false}   
    // }else{
    //     return {error:false ,success:1 }   
    // }