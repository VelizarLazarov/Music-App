const Playlist = require('../models/Playlist');

const create = (playlistData) => {
    let playlist = new Playlist(playlistData);

    return playlist.save();
}

const getAll = () => Playlist.find({}).lean()

const getOne = (inputId) => Playlist.find({_id:inputId}).lean()

module.exports = {create, getAll, getOne}