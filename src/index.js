console.log("check1")
const userRouterAccess = require('./routers/userRouter')
const testRouterAccess = require('./routers/testRouter')
const roomDataUtilsAccess = require('./utils/roomData')
const findUserByToken = require('./utils/userFoundByToken')


const http = require('http')

const path = require('path')
require('./mongoose.js')

const publicDirectoryPath = path.join(__dirname,"../Public")
//console.log(publicDirectoryPath)
const express = require('express');
const app = express();
const socketio = require('socket.io')
const server = http.createServer(app)
const io = socketio(server)


const port = process.env.PORT;

app.use(express.json());
app.use(express.static(publicDirectoryPath))
app.use(testRouterAccess)
app.use(userRouterAccess)

io.on('connection', (socket) => {
    console.log('New WebSocket connection')

    socket.on('socketCheck', () => {
        console.log('The button click is ALWAYS second in the server!')        
      //  console.log(socket);
        socket.broadcast.emit ('socketCheck')
////to
        })
    
        socket.on('join', ({ /*token,*/ roomName },/*options,*/a, callback) => {
            // const { error, user } = addUser({ id: socket.id, ...options })
            console.log("join working server "+ roomName)

            // if (error) {
            //     return callback(error)
            // }
            //indifferent between getting all the data of the room at once and getting it in 1 property like that:
           console.log(roomDataUtilsAccess.getRoomNameCountPlayers(roomName))
            switch(roomDataUtilsAccess.getRoomNameCountPlayers(roomName)){
                case 0: 

                socket.join(roomName)
                socket.emit('prepareSocketWithToken',/*socket,*/ roomDataUtilsAccess.createNewRoom(roomName))
                console.log(socket.test)
                console.log(socket.test2)

                break;
                case 1: 
                socket.test=2
                console.log(socket)
                socket.join(roomName)
                roomDataUtilsAccess.joinExistingRoom(roomName)     
                socket.emit('startGameBySendingToServerGameInitDataEvent',roomName)
                break;
                case 2: 
                socket.emit('roomFullEvent')
                break;
            }
  })
  // socket.on('serverExchangeSocketIDs',(initGameObject)=>{
  //   console.log('serverExchangeSocketIDs start');
  //   console.log(initGameObject[0].roomName);
  //   socket.broadcast.to(initGameObject[0].roomName).emit('exchangeSocketIDs',initGameObject )
  //   console.log('serverExchangeSocketIDs end');
  // })
  socket.on('addOtherPlayerIsWhitePropertyDirectlyToSocket',(initGameObject)=>{
    socket.broadcast.to(initGameObject[0].roomName).emit('addOtherPlayerIsWhitePropertyDirectlyToSocket',initGameObject)

  })

  socket.on('copyInitGameObjectAndaddRoomNameToSockets',(initGameObject)=>{
    io.to(initGameObject[0].roomName).emit('copyInitGameObjectAndaddRoomNameToSockets',initGameObject )

  })

  socket.on('gameInit',()=>{
    console.log('gameInit start');
    socket.emit('InitGameDataRendering')
    // io.to(socket.roomName).emit('InitGameDataRendering')
    console.log('gameInit end');
  })

  socket.on('overwriteGameDataObjecetInOpponentSocket',(gameData)=>{
    console.log('overwriteGameData server start');
   // console.log(socket.roomName)
   socket.broadcast.to(gameData.roomName).emit('overwriteGameDataObjecetInOpponentSocket',gameData)
    console.log('overwriteGameData server end');
  })
  socket.on('middleGameDataRendering',(gameData)=>{
    console.log('middleGameDataRendering server start');
   // console.log(socket.roomName)
     io.to(gameData.roomName).emit('middleGameDataRendering',gameData)
    console.log('middleGameDataRendering server end');
  })
  socket.on('notPossibleToEneterAlert',(gameData)=>{
    console.log('notPossibleToEneterAlert server start');
   // console.log(socket.roomName)
     io.to(gameData.roomName).emit('notPossibleToEneterAlertClient',gameData)
    console.log('notPossibleToEneterAlert server end');
  })
  socket.on('showDiceOnScreen',(gameData)=>{
    console.log('showDiceOnScreen server start');
   // console.log(socket.roomName)
     io.to(gameData.roomName).emit('showDiceOnScreenInAllSockets',gameData)
    console.log('showDiceOnScreen server end');
  })
  socket.on('rateWinnerUp',async (token)=>{
    console.log(token);

    console.log('rateWinnerUp server start');
    const user = await findUserByToken(token);
    console.log('user found in index');
    console.log(user.name)
    console.log('user pre-rating');
    console.log(user.rating);
     user.rating = user.rating+1;
     console.log('user post-rating');
    console.log(user.rating);
    user.save();

  })

  socket.on('eraseRoom',/*async*/ (roomName)=>{
    console.log(roomName);

    console.log('eraseRoom server start');
    //const user = await 
    console.log('rooms pre-erase');
    console.log(roomDataUtilsAccess.rooms)
    roomDataUtilsAccess.eraseRoomFromArray(roomName);
   // console.log('eraseRoom found in index');
   console.log('rooms post-erase');

    console.log(roomDataUtilsAccess.rooms)
    //console.log(user.rating);   

  })
  socket.emit('eraseRoom',socket.roomName);

  // socket.on('cantMakeMove',()=>{
  //   io.to(gameData.roomName).emit('cantMakeMove')

  // })
})

            
            // if(a==0){
            //   socket.join(roomName)
            // }else if(){

            // }else{

            // }

          //  socket.emit('message', generateMessage('Admin', 'Welcome!'))
            // socket.broadcast.to(user.room).emit('message', generateMessage('Admin', `${user.username} has joined!`))
//             io.to(roomName).emit('roomNameEvent',roomDataUtilsAccess.roomNameFunction(roomName)
//             // , {
//             //     room: user.room,
//             //     users: getUsersInRoom(user.room)
//             // }
//             )
    
//             callback()
//         })
    

// })
//app will become server when it's secket is added
server.listen(port,()=>console.log("Server is up on port "+port))

