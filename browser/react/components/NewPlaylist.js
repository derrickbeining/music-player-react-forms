import React, {Component} from 'react';
import axios from 'axios';

export default class NewPlaylist extends Component {
  constructor() {
    super()
    this.state = {
      value: '',
      isDirty: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (event) {
    const value = event.target.value;
    const isDirty = (value.length > 16 || value.length === 0);
    this.setState({value, isDirty});
  }

  handleSubmit (event) {
    event.preventDefault();
    axios.post('api/playlists', {name: this.state.value})
      .then(res => res.data)
      .then(console.log.bind(console))
      .then(() => this.setState({value: '', isDirty: false}))
      .catch(console.error.bind(console));
  }


  isSubmitDisabled () {
    return this.state.value.length > 16 || this.state.value.length === 0;
  }

  render () {
    return (
      <div className="well">
        <form className="form-horizontal" onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>New Playlist</legend>
            <div className="form-group">
              <label className="col-xs-2 control-label">Name</label>
              <div className="col-xs-10">
                <input className="form-control" type="text" value={this.state.value} onChange={this.handleChange} />
                {
                  this.state.isDirty && <div className="alert alert-warning">Please enter a name</div>
                }
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-10 col-xs-offset-2">
                <button type="submit" className="btn btn-success" disabled={this.isSubmitDisabled()}>Create Playlist</button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}
