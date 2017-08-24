import React, {Component} from 'react';
import Songs from './songs';
import axios from 'axios';

export default class SinglePlaylist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlist: {}
    }
  }

  componentDidMount () {
    const playlistId = this.props.match.params.playlistId;
    axios.get(`api/playlists/${playlistId}`)
      .then(res => res.data)
      .then(playlist => this.setState({playlist}))
      .catch(console.error.bind(console));
  }

  componentWillReceiveProps (nextProps) {
    const nextPlaylistId = nextProps.match.params.playlistId;
    const currentPlaylistId = this.props.match.params.playlistId;
    if (currentPlaylistId !== nextPlaylistId) {
      axios.get(`api/playlists/${nextPlaylistId}`)
        .then(res => res.data)
        .then(playlist => this.setState({playlist}))
        .catch(console.error.bind(console));
    }
  }

  render () {
    const playlist = this.state.playlist;
    return (
      <div>
        <h3>{playlist.name}</h3>
        <Songs songs={playlist.songs} /> {/** Hooray for reusability! */}
        {playlist.songs && !playlist.songs.length && <small>No songs.</small>}
        <hr />
      </div>
    )
  }
}
