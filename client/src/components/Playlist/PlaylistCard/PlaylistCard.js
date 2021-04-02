import { Component } from 'react';
import { Link } from 'react-router-dom'

class PlaylistCard extends Component {
    render() {
        return (
            <>
            <Link className="cardnav" to={`/playlist/${this.props.data._id}/details`}>
                <div className="cardWrapper">
                    <div className="playlistCard">
                        <img src={this.props.data.imgUrl} alt="playlist thumbnail" className="playlistThumbnail"></img>
                        <div className="playlistStats">
                            <h4>{this.props.data.title}</h4>
                            <p>song count: {this.props.data.songs.length}</p>
                            <p>likes: {this.props.data.likes ?? 0}</p>
                        </div>
                    </div> 
                </div>
            </Link>
                <style jsx="true">{`
                .cardnav{
                    text-decoration:none;
                    margin-left:25px;
                    margin-top:25px;
                }
                .cardWrapper{
                    width:240px;
                    height:340px;
                    background-color: #282b30;
                    color:white;
                    padding-left:12px;
                    padding-top:13px;
                }
                .playlistCard{
                    width:228px;
                    height:286px;
                }
                .playlistThumbnail{
                    width:100%;
                    height:208px;
                }
                .playlistStats p{
                    width:208px;
                    text-align:left;
                    position: relative;
                    padding-left:20px
                }
                .playlistStats h4{
                    margin:0px;
                    font-size:1.5em;
                    font-weight:bold;
                    text-align:left;
                    padding-left: 20px
                }
                .cardWrapper:hover {
                    cursor:pointer;
                    background-color: #424549;
                }
            `}</style>
            </>
        )
    }
}

export default PlaylistCard