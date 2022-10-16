import { GlobalStoreContext } from '../store'
import { useHistory } from 'react-router-dom'
import { useContext, useState } from 'react'
/*
    This modal is shown when the user asks to delete a list. Note 
    that before this is shown a list has to be marked for deletion,
    which means its id has to be known so that we can retrieve its
    information and display its name in this modal. If the user presses
    confirm, it will be deleted.
    
    @author McKilla Gorilla
*/
function EditSongModal() {
    const { store } = useContext(GlobalStoreContext);
    const [ title, setTitle ] = useState("");
    const [ artist, setArtist ] = useState("");
    const [ youTubeId, setYouTubeId ] = useState("");

    store.history = useHistory();
    
    let songTitle = "";
    let songArtist = "";
    let songYouTubeId = "";
    if (store.songToEdit) {
        let id = store.songToEdit;
        songTitle = store.currentList.songs[id].title;
        songArtist = store.currentList.songs[id].artist;
        songYouTubeId = store.currentList.songs[id].youTubeId;
    }

    function handleEditSongConfirmed(event) {
        let newTitle = title;
        let newArtist = artist;
        let newYouTubeId = youTubeId;

        if(title.length === 0)
            newTitle = songTitle;
        if(artist.length === 0)
            newArtist = songArtist;
        if(youTubeId.length === 0)
            newYouTubeId = songYouTubeId;
        
        let newSong = {title:newTitle, artist:newArtist, youTubeId:newYouTubeId};   
        store.newEditSongTransaction(store.songToEdit, newSong);
    }
    function handleCloseModal(event) {
        store.hideEditSongModal();
    }
    function handleUpdateTitle(event) {
        setTitle(event.target.value);
    }
    function handleUpdateArtist(event) {
        setArtist(event.target.value);
    }
    function handleUpdateYouTubeId(event) {
        setYouTubeId(event.target.value);
    }

    return (
        <div 
            className="modal" 
            id="edit-song-modal" 
            data-animation="slideInOutLeft">
            <div className="modal-root" id='verify-delete-list-root'>
                <div className="modal-north modal-prompt">
                    Edit Song
                </div>
                <div className="modal-center">
                    <div className="modal-center-content modal-textfield">
                    <div className="modal-center-content modal-textfield">  
                            Title: <input className="edit-song-input" 
                                            id="titleInput" 
                                            defaultValue={songTitle}
                                            onChange={handleUpdateTitle}
                                            type="text" /> <br></br>
                            Artist: <input className="edit-song-input" 
                                            id="artistInput" 
                                            defaultValue={songArtist}
                                            onChange={handleUpdateArtist}
                                            type="text" /> <br></br>
                            youTubeId: <input className="edit-song-input" 
                                            id="youTubeIdInput" 
                                            defaultValue={songYouTubeId}
                                            onChange={handleUpdateYouTubeId}
                                            type="text" /> <br></br>
                        </div>
                    </div>
                </div>
                <div className="modal-south">
                    <button
                        id="dialog-yes-button"
                        className="modal-button"
                        onClick={handleEditSongConfirmed}
                    >Confirm</button>
                    <button
                        id="dialog-no-button"
                        className="modal-button"
                        onClick={handleCloseModal}
                    >Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default EditSongModal;