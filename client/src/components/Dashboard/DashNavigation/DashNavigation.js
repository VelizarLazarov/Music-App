import { Component } from 'react'
import { Link } from 'react-router-dom'

class DashNavigation extends Component {
    render(){
        return (
            <>
                <nav className="dashnav">
                    <ul>
                        <li><Link to="/playlists/popular">Popular</Link></li>
                        <li><Link to="/playlists/recent">Recent</Link></li>
                        <input type="text" placeholder="Search.."></input>
                    </ul>
                </nav>
                <style jsx="true">{`          
                    .dashnav li{
                        display: inline-block;                    
                        padding: 14px;                       
                        border-radius: 5px;                       
                    }
                    .dashnav li a{
                        text-align: center;
                        text-decoration: none;
                        font-size: 20px;
                        color:white;
                    }
                    .dashnav li:hover{
                        background-color: #7289da;
                        font-weight: bold;
                    }
                    .dashnav input[type=text] {
                        padding: 6px;
                        margin-top: 12px;
                        margin-left: 16px;
                        font-size: 18px;
                        font-weight: bold;
                      }
                `}</style>
            </>
        )
    }
}
export default DashNavigation