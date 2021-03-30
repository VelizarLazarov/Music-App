import { Component } from 'react'

class Register extends Component{
    constructor(props){
        super(props)

        this.onLoginSubmit = this.onLoginSubmit.bind(this);
    }

    onLoginSubmit(e){
        e.preventDefault()
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
            this.props.handler();        
        })
        .then(() => {
            e.target.reset()
        })
    }
    render(){
        return(
            <>
            <form onSubmit={this.onLoginSubmit}>
                <h1>Login</h1>

                <label htmlFor="username">Username:</label>
                <input type="text" name="username" placeholder="Username"></input>

                <label htmlFor="password">Password:</label>
                <input type="text" name="password" placeholder="Password"></input>

                <button type="submit">Login</button>

            </form>

            <style jsx="true">{`
                form{
                    position:absolute;
                    right:242px;
                    top:56px;
                    display: flex;
                    flex-direction: column;
                    align-items: left;
                    padding:40px;
                    width:200px;
                    height:300px;
                    color: white;
                    border-radius: 0 0 15px 15px;
                    border-top-style: solid;
                    border-top-color: #7289da;
                    border-top-width: 5px;
                    background-color:#282b30;
                }
                form input {
                    border-radius: 6px;
                    padding: 1.5%;
                    width: 95%;
                    display:block;
                    font-size:large;
                }
                form label{
                    font-size:large;
                }
                form button{
                    margin-top:40px;
                    background-color:#7289da;
                    border: none;
                    color: white;
                    padding: 15px 32px;
                    border-radius: 5px;
                    font-size:large;
                    
                }
                form button:hover{
                    cursor:pointer;
                }
                
                
            
            `}</style>
            </>
        )
    }
}

export default Register