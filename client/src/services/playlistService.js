import firebase from 'firebase/app'
import 'firebase/storage';

export const createPlaylist = (e) => {

    let playlistObj = {
        title: e.target.title.value,
        imgUrl: e.target.thumbnail.value
    }
    return fetch(`http://localhost:5000/playlist/createPlaylist/${window.localStorage.getItem("username")}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(playlistObj)
    })
        .then(res => res.json())
}

export const editPlaylist = (e, parentId) => {

    let playlistObj = {
        title: e.target.title.value,
        imgUrl: e.target.imgUrl.value
    }

    return fetch(`http://localhost:5000/playlist/${parentId}/update`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(playlistObj)
    })
    .then(res => res.json())
}

export const deleteSong = (songId, playlistId) => {
    return fetch(`http://localhost:5000/playlist/${playlistId}/delete/${songId}`, { method: 'DELETE' })
}
export const getSongFile = (artist, title, callback) => {
    let songReference = firebase.storage().refFromURL(`gs://musicapp-dc722.appspot.com/songs/${artist}-${title}.mp3`);
    
    songReference.getDownloadURL()
        .then(url => {
            let xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = (event) => {
                let blob = xhr.response;
               callback(URL.createObjectURL(blob))
               
            };
            xhr.open('GET', url);
            xhr.send();
        })
        
        .catch(error => console.log(error))
    
}

export const createSong = (e, playlistId, songFile) => {

    let storageRef = firebase.storage().ref();
    storageRef.child(`songs/${e.target.artist.value}-${e.target.title.value}.mp3`).put(songFile, {contentType: 'mp3'})
    

    let songObj = {
        title: e.target.title.value,
        artist: e.target.artist.value,
        songLink: `songs/${e.target.artist.value}-${e.target.title.value}.mp3`
    }
    return fetch(`http://localhost:5000/playlist/${playlistId}/addSong`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(songObj)
    })
    .then(res => res.json())
}

export const deletePlaylist = (playlistId) => {
    return fetch(`http://localhost:5000/playlist/${playlistId}/delete`, { method: 'DELETE' })
}

export const likePlaylist = (listId, userId) => {
    return fetch(`http://localhost:5000/playlist/${listId}/like/${userId}`)
}

export const getPlaylist = (listId) => {
    return fetch(`http://localhost:5000${listId}`)
        .then(res => res.json())
}

export const getAllPlaylists = () => {
    return fetch(`http://localhost:5000/`)
        .then(res => res.json())
}

export const getSortedPlaylists = (order) => {
    return fetch(`http://localhost:5000/${order}`)
        .then(res => res.json())
}

export const getUserPlaylist = (username) => {
    return fetch(`http://localhost:5000/playlist/createdBy/${username}`)
        .then(res => res.json())
}
