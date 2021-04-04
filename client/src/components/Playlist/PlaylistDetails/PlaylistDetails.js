import { Component } from 'react'
import Song from '../../Song/SongDetails/SongDetails'
import CreateSong from '../../Song/CreateSong/CreateSong'

class PlaylistDetails extends Component{
    constructor(props){
        super(props)

        this.state = {
            showSongForm: false,
            showLikeBtn: false,
            playlist: {},
            user:{},
            userHasLiked: false,
            userIsPlaylistCreator: false
        }
        this.mounted = true;
        this.onAddSongClick = this.onAddSongClick.bind(this);
        this.onLikeClick = this.onLikeClick.bind(this);
        this.onDeleteSongClick = this.onDeleteSongClick.bind(this);
    }

    onAddSongClick(){
        this.setState({showSongForm:!this.state.showSongForm});

    }
    onDeleteSongClick(songId){
        fetch(`http://localhost:5000/playlist/${this.props.match.params.id}/delete/${songId}`, {method:'DELETE'})
        .then(pl => this.setState({playlist: pl}))
    }
    onLikeClick(){
        fetch(`http://localhost:5000/playlist/${this.props.match.params.id}/like/${this.state.user._id}`,{
        })
        .then(() => {
            if(this.mounted) {
                this.setState({...this.state, likes:this.state.likes + 1})
                this.setState({userHasLiked:true})
            }
        })
        .catch(err => console.log(err))
    }

    componentDidMount(){
        Promise.all([
            fetch(`http://localhost:5000${this.props.match.url}`).then(res => res.json()),
            window.localStorage.getItem("username") ?
            fetch(`http://localhost:5000/auth/getUser/${window.localStorage.getItem("username")}`).then(res => res.json())
            : null
        ]).then(([playlistData, userData]) => {
            if(this.mounted){
                this.setState({playlist: playlistData})
                if(userData){
                this.setState({user: userData})
                this.setState({showLikeBtn: true})
                this.setState({userIsPlaylistCreator:this.state.user._id === this.state.playlist.creator})
                this.setState({userHasLiked: userData.likedPlaylists.find(listId => listId === this.state.playlist._id)})
                }
            }
        })
        .catch(err => console.log(err))  
        
    }

    componentDidUpdate(prevProps,prevState){
        fetch(`http://localhost:5000${this.props.match.url}`)
        .then(res => res.json())
        .then(res => {
            if(this.mounted) this.setState({playlist: res})
        })
        .catch(err => console.log(err))    
        if(JSON.stringify(prevState.playlist) === JSON.stringify(this.state.playlist)){
           return
        }
        
    }

    componentWillUnmount(){
        this.mounted = false;
    }

    render(){
        return(
            <>
            <div className="bgWrapper"><img className="detailsBackground" src={this.state.playlist.imgUrl} alt="thumbnail background"/></div>
            <div className="playlistHeader">
                <img className="playlistDetailsThumbnail" src={this.state.playlist.imgUrl} alt="album thumbnail"/>
                <h1>{this.state.playlist.title}</h1>
                <h3>{this.state.playlist.songs ? this.state.playlist.songs.length : 0} songs</h3>
                <h3>{this.state.playlist.likes ?? 0} likes</h3>
                
                {this.state.userIsPlaylistCreator ?
                <button className="createSongBtn" onClick={this.onAddSongClick}>Add Song</button>:
                null       
                }
                {this.state.showSongForm ? <CreateSong parentId={this.state.playlist._id}/> : null }

                {this.state.showLikeBtn ?
                    this.state.userHasLiked ? 
                        null
                        :
                        <button className="likeSongBtn" onClick={this.onLikeClick}>Like Playlist</button>
                :
                null
                }

            </div>
            <div className="playlistBody">
                <div className="songHeaders">
                    <h2>Song title</h2>
                    <h2>Artist</h2>
                    <h2>Length</h2>
                </div>
                {this.state.playlist.songs ? 
                    this.state.playlist.songs.map(p => <Song key={p._id} data={p} 
                        isCreator={this.state.userIsPlaylistCreator} delete={this.onDeleteSongClick}/>) :
                    null
                }
            </div>
            <style jsx="true">{`
            .likeSongBtn{
                position:relative;
                top:25%;
                left:60%;
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
            .likeSongBtn:hover{
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