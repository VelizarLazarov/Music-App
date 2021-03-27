import { Component } from 'react'
import { Redirect } from "react-router-dom";

class CreateSongBtn extends Component {
    constructor(props){
        super(props)

        this.onAddSongClick = this.onAddSongClick.bind(this)
    }
    onAddSongClick(e){
        e.preventDefault();
        let songObj = {
            title: e.target.title.value,
            artist: e.target.artist.value,
            songLink: e.target.songLink.value
        }
        fetch(`http://localhost:5000/playlist/${this.props.parentId}/addSong`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(songObj)
        })
        .then(() =>{
            e.target.reset()
        })
    }
    render() {
        return (
            <>
                <form onSubmit={e =>this.onAddSongClick(e)} className="addSongCard">
                <h2>Add Song</h2>

                <label htmlFor="title">Title:</label>
                <input type="text" name="title" placeholder="Title"></input>

                <label htmlFor="artist">Artist:</label>
                <input type="text" name="artist" placeholder="Artist"></input>

                <label htmlFor="artist">File Upload:</label>
                <input type="file" name="songFile"  accept="audio/*"></input>

                <h2>Or youtube link</h2>

                <input type="text" name="songLink" placeholder="Link here"></input>

                <button type="submit">Add</button>
                </form>

                <style jsx="true">{`
                    .addSongCard{
                        position:absolute;
                        left:28.1%;
                        top:0;
                        display: flex;
                        flex-direction: column;
                        align-items: left;
                        padding:40px;
                        width:200px;
                        height:400px;
                        color: white;
                        border-radius: 0 15px 15px 0;
                        border-left-style: solid;
                        border-left-color: #7289da;
                        border-left-width: 5px;
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
                        outline: none;
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

export default CreateSongBtn