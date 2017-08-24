import React from 'react';
import Songs from './songs';

export default function SinglePlaylist(props) {

  return (
    <div>
    <h3>{ playlist.name }</h3>
    <Songs songs={playlist.songs} /> {/** Hooray for reusability! */}
    { playlist.songs && !playlist.songs.length && <small>No songs.</small> }
    <hr />
  </div>
  )
}
