import { Component } from 'react'
import Song from '../../Song/SongDetails/SongDetails'
import CreateSong from '../../Song/CreateSong/CreateSong'
import EditPlaylist from '../EditPlaylist/EditPlaylist'
import { withRouter  } from 'react-router';
import * as playlistService from '../../../services/playlistService'
import * as authService from '../../../services/authService'


class PlaylistDetails extends Component{
    constructor(props){
        super(props)

        this.state = {
            showEditForm: false,
            showSongForm: false,
            showLikeBtn: false,
            playlist: {},
            user: {},
            userHasLiked: false,
            userIsPlaylistCreator: false
        }
        this.mounted = true;
        this.onAddSongClick = this.onAddSongClick.bind(this);
        this.onAddSongSubmit = this.onAddSongSubmit.bind(this);
        this.onLikeClick = this.onLikeClick.bind(this);
        this.onDeleteSongClick = this.onDeleteSongClick.bind(this);
        this.onDeletePlaylistClick = this.onDeletePlaylistClick.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
        this.onEditSubmit = this.onEditSubmit.bind(this);
    }

    onEditClick(){
        this.setState({showEditForm:!this.state.showEditForm});
    }
    onEditSubmit(newList){
        this.setState({playlist:newList});
    }

    onAddSongClick(){
        this.setState({showSongForm:!this.state.showSongForm});
    }
    onAddSongSubmit(song){
        let addedSongState = {...this.state.playlist, songs: [...this.state.playlist.songs, song]}
        this.setState({playlist: addedSongState})        
    }
    onDeleteSongClick(songId){
        playlistService.deleteSong(songId, this.props.match.params.id)
        .then(pl => this.setState({playlist: pl}))
    }
    onDeletePlaylistClick(){
        playlistService.deletePlaylist(this.props.match.params.id)
        .then(() => this.props.history.push('/'))
        .catch(err => console.log(err))
    }
    onLikeClick(){
        playlistService.likePlaylist(this.props.match.params.id, this.state.user._id)
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
            playlistService.getPlaylist(this.props.match.url),

            window.localStorage.getItem("username") ?
                authService.getUser(window.localStorage.getItem("username"))
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
        if(JSON.stringify(prevState.playlist) === JSON.stringify(this.state.playlist)){
            console.log(JSON.stringify(prevState.playlist))
            console.log(JSON.stringify(this.state.playlist))
           return
        }
        playlistService.getPlaylist(this.props.match.url)
        .then(res => {
            if(this.mounted) this.setState({playlist: res})
        })
        .catch(err => console.log(err))    
        
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

                {this.state.showSongForm ? <CreateSong parentId={this.state.playlist._id} songHandler={this.onAddSongSubmit}/>
                : null }

                {this.state.showLikeBtn ?
                    this.state.userHasLiked ? 
                        null
                        :
                        <button className="likeSongBtn" onClick={this.onLikeClick}>Like Playlist</button>
                :null}

                {this.state.userIsPlaylistCreator ? 
                <button className="editPlaylistBtn" onClick={this.onEditClick}>Edit Playlist</button>
                :
                null}
                {this.state.userIsPlaylistCreator ?
                <button className="deletePlaylistBtn" onClick={this.onDeletePlaylistClick}>Delete Playlist</button>
                :
                null}

                {this.state.showEditForm ? <EditPlaylist parentId={this.state.playlist._id}
                 title={this.state.playlist.title} imgUrl={this.state.playlist.imgUrl} editHandler={this.onEditSubmit}/> : null}

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
            .deletePlaylistBtn{
                position:fixed;
                top:20%;
                left:790px;
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
            .editPlaylistBtn{
                position:fixed;
                top:40%;
                left:800px;
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
            .editPlaylistBtn:hover{
                cursor:pointer;
            }
            .deletePlaylistBtn:hover{
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

export default withRouter(PlaylistDetails)