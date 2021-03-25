import { Component } from "react";
import DashNavigation from './DashNavigation/DashNavigation'
import PlaylistCard from '../Playlist/PlaylistCard/PlaylistCard'

class Dashboard extends Component{
    constructor(props){
        super(props);

        this.state = {
            playlists: []
        }
    }

    componentDidMount(){
        fetch('http://localhost:5000/')
        .then(res => res.json())
        .then(res => this.setState({playlists: res}))
        .catch(error => console.log(error))
        
    }

    render(){
        return(<>
            <DashNavigation/>
            <div className="playlistContainer">
                {this.state.playlists.map(p => 
                    <PlaylistCard key={p._id} data={p}/>)}
                    
            </div>


            <style jsx="true">{`
                .playlistContainer{
                    display: flex;
                    justify-content: center;
                }
            `}</style>
            </>
        )
    }
}

export default Dashboard