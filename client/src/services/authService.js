export const onLoginSubmit = (e, headerCallback) =>{
    const username = e.target.username.value;
    const password = e.target.password.value;

    fetch('http://localhost:5000/auth/login',{method:"POST",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body:JSON.stringify({username,password})})
    .then(res => res.json())
    .then(res => {
        //console.log(res["token"])
        window.localStorage.setItem("token",res["token"]); 
        window.localStorage.setItem("username", username)   
        headerCallback();        
    })
    .then(() => {
        e.target.reset()
    })
}

export const  onRegisterSubmit = (e, headerCallback) =>{
    const username = e.target.username.value;
    const password = e.target.password.value;
    //const rePassword = e.target.repeatPassword.value;

    fetch('http://localhost:5000/auth/register',{method:"POST",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body:JSON.stringify({username,password})})
    .then(() => {
        e.target.reset();
        headerCallback()
    })
    
}

export const getUser = (username) => {
    return fetch(`http://localhost:5000/auth/getUser/${username}`)
    .then(res => res.json())
}