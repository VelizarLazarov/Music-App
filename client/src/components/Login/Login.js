import { Component } from 'react'

class Register extends Component{
    render(){
        return(
            <>
            <form method="POST">
                <h1>Login</h1>

                <label for="username">Username:</label>
                <input type="text" name="username" placeholder="Username"></input>

                <label for="password">Password:</label>
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