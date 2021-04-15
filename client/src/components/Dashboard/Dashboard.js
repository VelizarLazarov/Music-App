import { Component } from "react";
import DashNavigation from './DashNavigation/DashNavigation'
import PlaylistCard from '../Playlist/PlaylistCard/PlaylistCard'
import { getAllPlaylists, getSortedPlaylists } from '../../services/playlistService'

class Dashboard extends Component{
    constructor(props){
        super(props);

        this.state = {
            playlists: [],
            sortOrder: '',
            mounted: true
        }
        this.sortPlaylists = this.sortPlaylists.bind(this);
    }

    componentDidMount(){
        getAllPlaylists()
        .then(res => this.setState({playlists: res}))
        .catch(error => console.log(error))
        
    }  
    componentDidUpdate(prevProps,prevState){
        if(this.state.sortOrder === prevState.sortOrder){
            return
        }
        getSortedPlaylists(this.state.sortOrder)
        .then(res => {
            if(this.state.mounted) this.setState({playlists: res})})
        .catch(error => console.log(error))
        
    }

    componentWillUnmount(){
        this.setState({mounted: false});
    }

    sortPlaylists(sortBy){
        this.setState({sortOrder:sortBy})
    }

    render(){
        return(<>
            <DashNavigation sortCategory={this.sortPlaylists}/>
            <div className="playlistContainer">
                {this.state.playlists.map(p => 
                    <PlaylistCard key={p._id} data={p}/>)
                }
                    
            </div>


            <style jsx="true">{`
                .playlistContainer{
                    box-sizing: border-box;
                    display: flex;
                    flex-wrap: wrap;
                    width:100%;
                    justify-content: center;
                }
            `}</style>
            </>
        )
    }
}

export default Dashboard