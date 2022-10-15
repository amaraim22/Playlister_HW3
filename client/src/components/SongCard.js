import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'

function SongCard(props) {
    const { store } = useContext(GlobalStoreContext);

    function handleMarkSongForDeletion(event) {
        if (!event.target.disabled) {
            let _id = event.target.id;


            if (_id.indexOf('remove-song-') >= 0) {
                _id = ("" + _id).substring("remove-song-".length);
            }

            store.markSongForDeletion(_id);
        }
    }

    const { song, index } = props;
    let cardClass = "list-card unselected-list-card";
    return (
        <div
            key={index}
            id={'song-' + index + '-card'}
            className={cardClass}
        >
            {index + 1}. 
            <a
                id={'song-' + index + '-link'}
                className="song-link"
                href={"https://www.youtube.com/watch?v=" + song.youTubeId}>
                {song.title} by {song.artist}
            </a>
            <input
                type="button"
                id={"remove-song-" + index}
                className="list-card-button"
                onClick={handleMarkSongForDeletion}
                value={"\u2715"}
            />
        </div>
    );
}

export default SongCard;