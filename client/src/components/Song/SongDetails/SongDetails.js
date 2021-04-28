/* eslint-disable no-useless-constructor */
import { Component } from 'react'
import { getSongFile } from '../../../services/playlistService'

class SongDetails extends Component{
    constructor(props){
        super(props)
        this.state = {
            songSrc: undefined,
            playSong: false
        }
        this.deleteSong = this.deleteSong.bind(this);
        this.playSongClick = this.playSongClick.bind(this);
        this.songLinkCallback = this.songLinkCallback.bind(this);
    }

    deleteSong(){
        this.props.delete(this.props.data._id)
        
    }
    playSongClick(){
        getSongFile(this.props.data.artist, this.props.data.title, this.songLinkCallback)
        
    }
    songLinkCallback(xhrResponse){
        
        console.log(xhrResponse)
        this.setState({playSong:true})
        this.setState({songSrc:xhrResponse})
        let audio = new Audio(xhrResponse).play()
    }

    render(){
        return(
            <>
            <div className="songDetails">
                <h3>{this.props.data.title}</h3>
                <h3>{this.props.data.artist}</h3>
                
                {this.state.playSong ?
                <audio controls autoPlay>
                <source src={this.state.sorgSrc} type="audio/mpeg"/>
                </audio> :
                null
                }
                <h3>lengthasdasd</h3>
                <button className="deleteSongBtn" onClick={this.playSongClick}>Play</button>

                {this.props.isCreator ?
                <button className="deleteSongBtn" onClick={this.deleteSong}>Delete</button>:
                null
                }

            </div>
            <style jsx="true">{`
                .deleteSongBtn{
                    position:relative;
                
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
                .songDetails{
                    height:50px;
                    margin-top:12px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .songDetails h3{                    
                    display:inline;
                    color:white;
                    padding-right:15%;
                    padding-left:7%;
                    font-weight:400;
                }
                .songDetails:hover{
                    cursor:pointer;
                    background-color:#424549;
                }
                .deleteSongBtn:hover{
                    cursor:pointer;
                    font-weight:bold;
                }
            `}</style>
            </>
        )
    }
}

export default SongDetails