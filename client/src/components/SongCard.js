import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'

function SongCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [draggedTo, setDraggedTo] = useState(0);

    function handleDragStart(event) {
        event.dataTransfer.setData("song", event.target.id);
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDragEnter(event) {
        event.preventDefault();
        setDraggedTo(true);
    }

    function handleDragLeave(event) {
        event.preventDefault();
        setDraggedTo(false);
    }

    function handleDrop(event) {
        event.preventDefault();
        let targetId = event.target.id;
        targetId = targetId.substring(10, targetId.length);
        let sourceId = event.dataTransfer.getData("song");
        sourceId = sourceId.substring(10, sourceId.length);
        setDraggedTo(false);

        sourceId = parseInt(sourceId);
        targetId = parseInt(targetId);
        store.newMoveSongTransaction(sourceId, targetId);
    }

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
                _id = ("" + _id).substring('song-card-'.length);
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
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            draggable="true"
            onDoubleClick={handleEditSongActive}
        >
            {index + 1}. 
            <a
                id={'song-link-' + index}
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