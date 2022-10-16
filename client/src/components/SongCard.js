import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'

function SongCard(props) {
    const { store } = useContext(GlobalStoreContext);

    function handleMarkSongForDeletion(event) {
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('delete-song-') >= 0) {
                _id = ("" + _id).substring("delete-song-".length);
            }
            store.markSongForDeletion(_id);
        }
    }

    function handleEditSongActive(event) {
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('song-card-') >= 0) {
                _id = ("" + _id).substring("song-card-".length);
            }
            store.editSongActive(_id);
        }
    }

    const { song, index } = props;
    let cardClass = "list-card unselected-list-card";
    return (
        <div
            key={index}
            id={'song-card-' + index}
            className={cardClass}
            onDoubleClick={handleEditSongActive}
        >
            {index + 1}. 
            <a
                id={'song--link-' + index}
                className="song-link"
                href={"https://www.youtube.com/watch?v=" + song.youTubeId}>
                {song.title} by {song.artist}
            </a>
            <input
                type="button"
                id={"delete-song-" + index}
                className="list-card-button"
                onClick={handleMarkSongForDeletion}
                value={"\u2715"}
            />
        </div>
    );
}

export default SongCard;