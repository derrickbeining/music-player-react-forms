import React, {Component} from 'react';
import Songs from './songs';
import AddSongForm from './AddSongForm';
import axios from 'axios';

export default class SinglePlaylist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlist: {}
    }

    this.setPlaylistById = this.setPlaylistById.bind(this);
    this.addSongToPlaylist = this.addSongToPlaylist.bind(this);
  }

  componentDidMount () {
    const playlistId = this.props.match.params.playlistId;
    this.setPlaylistById(playlistId);
  }

  componentWillReceiveProps (nextProps) {
    const nextPlaylistId = nextProps.match.params.playlistId;
    const currentPlaylistId = this.props.match.params.playlistId;
    if (currentPlaylistId !== nextPlaylistId) {
      this.setPlaylistById(nextPlaylistId);
    }
  }

  setPlaylistById (id) {
    axios.get(`api/playlists/${id}`)
      .then(res => res.data)
      .then(playlist => {
        console.log(playlist);
        this.setState({playlist})
      })
      .catch(console.error.bind(console));
  }

  addSongToPlaylist (song) {
    this.setState((prevState) => {
      const prevSongs = prevState.playlist.songs;
      prevState.playlist.songs = [ ...prevSongs, song ];
      return prevState;
    })
  }


  render () {
    const playlist = this.state.playlist;
    return (
      <div>
        <h3>{playlist.name}</h3>
        <Songs songs={playlist.songs} /> {/** Hooray for reusability! */}
        {playlist.songs && !playlist.songs.length && <small>No songs.</small>}
        <hr />
        <AddSongForm playlistId={this.state.playlist.id} addSongToPlaylist={this.addSongToPlaylist} />
      </div>
    )
  }
}
