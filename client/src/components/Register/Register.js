import { Component } from 'react'
import * as authService from '../../services/authService'

class Register extends Component{
    constructor(props){
        super(props)

        this.registerHandler = this.registerHandler.bind(this);
    }

    registerHandler(e){
        e.preventDefault()
        authService.onRegisterSubmit(e, this.props.handler)
    }

   

    render(){
        return(
            <>
            <form  onSubmit={this.registerHandler}>
                <h1>Register</h1>

                <label htmlFor="username">Username:</label>
                <input type="text" name="username" placeholder="Username"></input>

                <label htmlFor="password">Password:</label>
                <input type="text" name="password" placeholder="Password"></input>

                <label htmlFor="repeatPassword">Repeat Password:</label>
                <input id="repeatPassword"  name="repeatPassword" placeholder="Repeat Password"></input>
                
                <button type="submit">Register</button>

            </form>

            <style jsx="true">{`
                form{
                    position:absolute;
                    left:451px;
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
                    margin-top:10px;
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