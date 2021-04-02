import { useState } from 'react'
import { useEffect } from 'react'
import PlaylistCard from '../PlaylistCard/PlaylistCard'

const UserPlaylists = () => {
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
         async function fetchPlaylists(){

            await fetch(`http://localhost:5000/playlist/createdBy/${window.localStorage.getItem("username")}`)
            .then(res => res.json())
            .then(playlistsData => setPlaylists(playlistsData))
            .catch(error => console.log(error))
        }
        fetchPlaylists()
    },[])

    return(
        <>
        <div className="playlistContainer">
                {playlists.map(p => 
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
    );
}

export default UserPlaylists