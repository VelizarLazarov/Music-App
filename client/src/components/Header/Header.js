import { Component } from "react"
import { Link} from 'react-router-dom'
import NavigationItem from './NavigationItem/NavigationItem'
import Register from '../Register/Register'
import Login from '../Login/Login'
import CreatePlaylist from '../Playlist/CreatePlaylist/CreatePlaylist'

class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            showRegister:false,
            showLogin:false,
            showPlaylistCreate:false,
            isLoggedIn: window.localStorage.getItem("token")
        }
        this.onRegisterClick = this.onRegisterClick.bind(this);
        this.onLoginClick = this.onLoginClick.bind(this);
        this.loginSubmitHandler = this.loginSubmitHandler.bind(this);
        this.onPlaylistCreateClick = this.onPlaylistCreateClick.bind(this);
        this.onLogoutClick = this.onLogoutClick.bind(this);
    }

    onLogoutClick(){
        window.localStorage.clear();
        this.setState({isLoggedIn: window.localStorage.getItem("token")});
        this.setState({showLogin: !this.state.showLogin});
    }

    loginSubmitHandler(){
        this.setState({isLoggedIn:window.localStorage.getItem("token")});
    }

    onRegisterClick(){
        this.setState({showLogin:false});
        this.setState({showRegister:!this.state.showRegister});
    }

    onLoginClick(){
        this.setState({showRegister:false});
        this.setState({showLogin:!this.state.showLogin});
    }

    onPlaylistCreateClick(){
        this.setState({showPlaylistCreate:!this.state.showPlaylistCreate});
    }

    render() {
        return (
            <>
            <nav className="header">
                <ul>
                    {this.state.isLoggedIn ? 
                    <>
                        <Link to={`/profile/${window.localStorage.getItem("username")}`}><NavigationItem>My Playlists</NavigationItem></Link>      
                        <button className="authFormBtn" onClick={this.onPlaylistCreateClick}>Create Playlist</button>
                        {this.state.showPlaylistCreate ? <CreatePlaylist/> : null }
                        <button className="authFormBtn" onClick={this.onLogoutClick}>Logout</button>
                    </>
                    : 
                    <>
                    <button className="authFormBtn" onClick={this.onRegisterClick}>Register</button>
                    {this.state.showRegister ? <Register handler={this.onLoginClick}/> : null }

                    <button className="authFormBtn" onClick={this.onLoginClick}>Login</button>
                    {this.state.showLogin ? <Login handler={this.loginSubmitHandler}/> : null }    
                    </>    

                    
                    }
                    <Link to="/"><NavigationItem>Home</NavigationItem></Link>      
                </ul>
                
            </nav> 
            <style jsx="true">{`
            .header {
                width: 100%;
                height: 10vh;
                background-color: #282b30;
                position: fixed;
                top: 0;
                text-align: center;
                z-index:1000;
            }
            .header .listItem{
                display: inline-block;
                height: auto;
                margin-right: 2%;
                cursor: pointer;
                padding: 0.5%;
                vertical-align: top;
                font-size: 20px;
            }           
            .header .authFormBtn{
                position:relative;
                margin-top:-6px;
                margin-right:10px;
                background-color:#7289da;
                border: none;
                outline:none;
                color: white;
                padding: 15px 25px;
                border-radius: 5px;
                font-size:large;
                text-decoration:none;
                color:white;
                border:none;
                font-weight:400;
            }
            
            .header .listItem:hover {
                font-weight: bold;
            }
            .header button:hover {
                cursor:pointer;
            }
            `}</style>
            </>
        );
    }
}

export default Header