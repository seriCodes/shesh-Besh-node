// const socket = io()
window.onload = () =>{
    console.log("index client loaded")
}

console.log("a check")

$Form = document.body.querySelector('form')



$Form.addEventListener('submit', (e) => {
    e.preventDefault();
    const userName = e.target.elements.userName.value
console.log(userName)

const password = e.target.elements.password.value
console.log(password)
//+ ''env variable for heroku
//console.log(fetch('http://localhost:3000/user/login?name='+userName+'&password='+ password))
fetch('/user/login?name='+userName+'&password='+ password)
  .then((response) => {
  console.log(response.status)
  console.log(response)
  const regex = RegExp('4+');
  if (regex.test(response.status)){
            console.log('fail to login')
            document.location.href = '/';
            alert('user not found')
        } else {
          response.json().then((data) => {
          console.log('succeeded to login')
          console.log(data.token)
          document.location.href = '/joinRoom.html?token='+data.token;

          })
         }//?token='+data.token  
        })
        .catch((e)=>{
          console.log('error')

             alert('user not found')
             document.location.href = '/';

         })
  })