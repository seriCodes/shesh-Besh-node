console.log("sss")

//export
 async function getUserData(token) {
        console.log("ddd")

        let h = new Headers({
            'Content-Type': 'text/plain',
            'Authentication': 'Bearer ' +token
          });
          console.log(h)

          let response = await  fetch('/user/profile', { 
          method: 'GET',
          headers: h,
         mode: 'cors',//this & next line doesen't do anything
         cache: 'default' 
        }) 
        let data = await response.json()
        console.log( "Data from userUtils")

        console.log(data)
        return data;
      }
        // .then((response) => {
        //   console.log("first then")

        // console.log(response.status)
        // console.log(response)
        // const regex = RegExp('4+');
      
        //       if (regex.test(response.status)){
        //           console.log('fail to login')
        //           alert('user not found')
        //       } else {
        //         response.json().then((data) => {
        //         console.log('succeeded to find')
        //         console.log(data)
        //         return data;
               
        //         })
        //        }  
        //       })
        //       .catch((e)=>{
        //         console.log('error')
        //            alert('user not found')
        //        })
////////////////////////////  }

  //  export {getUserData}
    




// const getUserData = (token) => {
//     let h = new Headers({
//         'Content-Type': 'text/plain',
//         'Authentication': 'Bearer ' +myToken
//       });
//      fetch('http://localhost:3000/user/profile', { 
//       method: 'GET',
//       headers: h,
//      mode: 'cors',//this & next line doesen't do anything
//      cache: 'default' 
//     })    
//     .then((response) => {
//     console.log(response.status)
//     console.log(response)
//     const regex = RegExp('4+');
  
//           if (regex.test(response.status)){
//               console.log('fail to login')
//               alert('user not found')
//           } else {
//             response.json().then((data) => {
//             console.log('succeeded to find')
//             console.log(data)
//             return data;
           
//             })
//            }  
//           })
//           .catch((e)=>{
//             console.log('error')
//                alert('user not found')
//            })
// }


// module.exports = {
// getUserData,
// }