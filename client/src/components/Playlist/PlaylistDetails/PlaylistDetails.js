import { Component } from 'react'
import Song from '../../Song/SongDetails/SongDetails'
import CreateSong from '../../Song/CreateSong/CreateSong'

class PlaylistDetails extends Component{
    constructor(props){
        super(props)

        this.state = {
            showSongForm: false,
            playlist: {}
        }
        this.onAddSongClick = this.onAddSongClick.bind(this);
    }

    onAddSongClick(){
        this.setState({showSongForm:!this.state.showSongForm});
        //console.log(this.state.playlist._id)

    }

    componentDidMount(){
        fetch(`http://localhost:5000${this.props.match.url}`)
        .then(res => res.json())
        .then(res => this.setState({playlist: res}))
        .catch(err => console.log(err))        
    }

    componentDidUpdate(prevProps,prevState){
        if(prevState.playlist.songs === this.state.playlist.songs){
           return
        }
        fetch(`http://localhost:5000${this.props.match.url}`)
        .then(res => res.json())
        .then(res => this.setState({playlist: res}))
        .catch(err => console.log(err))        
    }

    render(){
        return(
            <>
            <div className="bgWrapper"><img className="detailsBackground" src="https://i.pinimg.com/originals/5f/57/97/5f57975854202953a60b77d2f231f236.jpg" alt="thumbnail background"/></div>
            <div className="playlistHeader">
                <img className="playlistDetailsThumbnail" src="https://i.pinimg.com/originals/5f/57/97/5f57975854202953a60b77d2f231f236.jpg" alt="album thumbnail"/>
                <h1>{this.state.playlist.title}</h1>
                <h3>0 songs</h3>
                <h3>{this.state.playlist.likes} likes</h3>
                <button className="createSongBtn" onClick={this.onAddSongClick}>Add Song</button>
                {this.state.showSongForm ? <CreateSong parentId={this.state.playlist._id}/> : null }

            </div>
            <div className="playlistBody">
                <div className="songHeaders">
                    <h2>Song title</h2>
                    <h2>Artist</h2>
                    <h2>Length</h2>
                </div>
                {this.state.playlist.songs ? 
                    this.state.playlist.songs.map(p => <Song key={p._id} data={p}/>) :
                    null
                }
            </div>
            <style jsx="true">{`
            .createSongBtn{
                position:relative;
                top:25%;
                left:20%;
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
            .createSongBtn:hover{
                cursor:pointer;
            }
                .songHeaders{
                    width:100%;
                    background:#282b30;
                    border-bottom: 5px solid #7289da;
                }
                .songHeaders h2{                    
                    color:white;
                    display:inline-block;
                    padding-left:10%;
                    padding-right:15%;
                }
                .playlistBody{
                    backgroud-color::#1e2124;
                }
                .detailsBackground{        
                    width:100%;
                    height:300px;
                    filter: blur(32px);
                    overflow:hidden;
                }
                .bgWrapper{
                    width:100%;
                    align-items:center;            
                    overflow: hidden;
                }
                .playlistHeader{
                    width: 100%;
                    height: 39%;
                    position: absolute;
                    top: 14%;
                    left: 5%;
                }
                .playlistHeader h1{
                    position:absolute;
                    top:0;
                    left:20%;
                    color:white;
                    font-size:35px;
                    font-weight:500;
                }
                .playlistHeader h3{                  
                    display:block;                  
                    position:relative;
                    top:25%;
                    left:20%;
                    color:white;
                    font-size:20px;
                    font-weight:500;
                }
                .playlistDetailsThumbnail{
                    position: absolute;
                    top: 8px;
                    left: 16px;
                    float:left;
                    width:228px;
                    height:228px;
                }
            `}</style>
            </>
        )
    }
}

export default PlaylistDetails