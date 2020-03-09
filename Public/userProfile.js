//const userUtilsClientsAccess = require('./clientUtils/userUtils')

console.log("user profile html pre-loaded")
// import {getUserData} from './userUtils.js';
// const userRouterAccess = require('./userUtils')

 window.onload =(async () => {
    console.log("user ofile html loaded")
    const urlParams = new URLSearchParams(window.location.search);
    const myToken = urlParams.get('token');//400
    console.log( urlParams)
    console.log( myToken)
  const  userData= await getUserData(myToken);
  console.log( "userData f rom userProfile.js")

  console.log( userData)


  $spanUserData=document.body.querySelector('#userData')
               let text =  "name:"+userData.name +" user rating:"+ userData.rating;
                $spanUserData.insertAdjacentHTML('afterbegin', text);
    
  })
