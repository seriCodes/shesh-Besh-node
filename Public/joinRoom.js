window.onload = () =>{
      console.log("join room loaded")
      console.log( document.URL)
      const urlParams = new URLSearchParams(window.location.search);
const myToken = urlParams.get('token');
console.log( urlParams)
console.log( myToken)


  }
  $FormProfile = document.body.querySelector('#profile')
  $FormProfile.addEventListener('click', (e)=>{
    console.log('profile button clicked')
    //document.location.href = 'http://localhost:3000/';
    const urlParams = new URLSearchParams(window.location.search);
    const myToken = urlParams.get('token');

    document.location.href = '/userProfile.html?token='+myToken;
    

  })
  $inputRoom = document.body.querySelector('#inputRoom')
  $tokenJoin = document.body.querySelector('#addToken')
  $tokenJoin.addEventListener('click', (e)=>{

    e.preventDefault();
    
    console.log('tokenJoin button clicked')
    //document.location.href = 'http://localhost:3000/';
    console.log(window.location.search)

    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams)

    const myToken = urlParams.get('token');
    console.log(myToken)

 var roomName= document.getElementById("inputRoom").value;
    setTimeout(()=>{},3000)

   document.location.href = './‏‏ver.4- backgroun board -5.1 resize גרסת הגשה/Backgammon HTML.html?token='+myToken+'&roomName='+roomName;
    console.log('tokenJoin button clicked-END')
    //document.location.href = 'http://localhost:3000/joinRoom.html?token='+data.token;


  })

