import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class AllArtists extends Component {

  constructor() {
    super();
    this.state = {
      artists: [],
      input: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount () {
    axios.get('/api/artists')
      .then(res => res.data)
      .then(artists => this.setState({artists}));
  }

  handleChange (event) {
    this.setState({input: event.target.value})
  }

  listArtistsFilterdByInput () {
    const artists = this.state.artists.filter(artist => {
      return artist.name.toLowerCase().match(this.state.input.toLowerCase());
    });
    return artists.map(artist => {
      return (
        <div className="list-group-item" key={artist.id}>
          <Link to={`/artists/${artist.id}`}>{artist.name}</Link>
        </div>
      );
    })
  }

  render () {


    return (
      <div>
        <form className="form-group" style={{marginTop: '20px'}}>
          <input
            className="form-control"
            placeholder="Enter artist name"
            onChange={this.handleChange}
          />
        </form>
        <h3>Artists</h3>
        <div className="list-group">
          {this.listArtistsFilterdByInput()}
        </div>
      </div>
    );
  }
}
