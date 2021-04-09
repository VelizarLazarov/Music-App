import { Component } from 'react'
import { withRouter  } from 'react-router';

class CreatePlaylist extends Component{

    onCreatePlaylistClick(e){
        e.preventDefault()
        let playlistObj ={
            title: e.target.title.value,
            imgUrl: e.target.thumbnail.value
        }
        fetch(`http://localhost:5000/playlist/createPlaylist/${window.localStorage.getItem("username")}`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(playlistObj)
        })
        .then(res => res.json())
        .then(playlist =>{
            e.target.reset()
            this.props.history.push(`/playlist/${playlist._id}/details`)
        })

    }

    render(){
        return(
            <>
            <form onSubmit={e => this.onCreatePlaylistClick(e)} method="POST">
                <h1>Create Playlist</h1>

                <label htmlFor="username">Title:</label>
                <input type="text" name="title" placeholder="Title"></input>

                <label htmlFor="password">Upload Thumbnail:</label>
                <input type="text" name="thumbnail" placeholder="Image Url"></input>

                <button type="submit">Create</button>

            </form>

            <style jsx="true">{`
                form{
                    position:absolute;
                    left:542px;
                    top:56px;
                    display: flex;
                    flex-direction: column;
                    align-items: left;
                    padding:40px;
                    width:200px;
                    height:300px;
                    color: white;
                    border-radius: 0 0 15px 15px;
                    border-top-style: solid;
                    border-top-color: #7289da;
                    border-top-width: 5px;
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

export default withRouter(CreatePlaylist)