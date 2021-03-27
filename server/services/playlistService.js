const Playlist = require('../models/Playlist');
const Song = require('../models/Song')

const create = (playlistData) => {
    let playlist = new Playlist(playlistData);

    return playlist.save();
}

const createSong = (songData) => {
    let song = new Song(songData);

    return song.save();
}

const addSongToList = (listId, songId) => Playlist.findByIdAndUpdate(listId, {$push: {songs: songId}})

const getAll = () => Playlist.find({}).lean()

const getOne = (inputId) => Playlist.findById(inputId).populate('songs').lean()

module.exports = {create, createSong, getAll, getOne, addSongToList}