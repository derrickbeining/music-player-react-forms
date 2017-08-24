// RENDERED IN SinglePlaylist

import React, {Component} from 'react';
import axios from 'axios';

export default class AddSongForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSongId: '',
      songs: [],
    }
    this.generateSelectOptions = this.generateSelectOptions.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount () {
    axios.get('/api/songs')
      .then(res => res.data)
      .then(songs => this.setState({songs}))
      .catch(console.error.bind(console))
  }

  generateSelectOptions () {
    const songs = this.state.songs;
    return songs.map(song => {
      return <option key={song.id} value={song.id}>{song.name}</option>
    })
  }

  handleChange (event) {
    const inputValue = event.target.value;
    this.setState({selectedSongId: inputValue});
  }

  handleSubmit (event) {
    event.preventDefault()
    const songId = this.state.selectedSongId;
    const playlistId = this.props.playlistId;
    axios.post(
      `/api/playlists/${playlistId}/songs`,
      {id: songId}
    )
      .then(res => res.data)
      .then(addedSong => this.props.addSongToPlaylist(addedSong))
      .catch(console.error.bind(console));

  }

  render () {
    return (
      <div className="well">
        <form
          className="form-horizontal"
          noValidate
          name="songSelect"
          onSubmit={this.handleSubmit}
        >
          <fieldset>
            <legend>Add to Playlist</legend>
            <div className="form-group">
              <label htmlFor="song" className="col-xs-2 control-label">Song</label>
              <div className="col-xs-10">
                <select
                  className="form-control"
                  name="song"
                  placeholder="Select a song"
                  value={this.state.selectedSongId}
                  onChange={this.handleChange}
                >
                  {this.generateSelectOptions()}
                </select>
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-10 col-xs-offset-2">
                <button type="submit" className="btn btn-success">Add Song</button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    )
  }
}
