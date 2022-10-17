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

    let id = -1;
    let list = null;
    let initTitle = ""; 
    let initArtist = "";
    let initYouTubeId = "";
    if (store.songToEdit) {
        id = store.songToEdit;   
        list = store.currentList;
        initTitle = list.songs[id].title; 
        initArtist = list.songs[id].artist;
        initYouTubeId = list.songs[id].youTubeId;
    }

    function handleTitleChange(event) {
        setTitle(event.target.value);
    }
    function handleArtistChange(event) {
        setArtist(event.target.value);
    }
    function handleYouTubeIdChange(event) {
        setYouTubeId(event.target.value);
    }

    function handleEditSongConfirmed(event) {
        let newTitle = title;
        let newArtist = artist;
        let newYouTubeId = youTubeId;
        if(title === "")
            newTitle = initTitle;
        if(artist === "")
            newArtist = initArtist;
        if(youTubeId === "")
            newYouTubeId = initYouTubeId;
        
        let newSong = {
                            title: newTitle, 
                            artist: newArtist, 
                            youTubeId: newYouTubeId,
                            _id: list._id
                        };   
        store.newEditSongTransaction(id, newSong);
        store.setCurrentList(list._id); 
    }
    function handleCloseModal(event) {
        store.hideEditSongModal();
        store.setCurrentList(list._id);    
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
                                            defaultValue={initTitle}
                                            onChange={handleTitleChange}       
                                            type="text" /> <br></br>
                            Artist: <input className="edit-song-input" 
                                            id="artistInput" 
                                            defaultValue={initArtist}
                                            onChange={handleArtistChange} 
                                            type="text" /> <br></br>
                            youTubeId: <input className="edit-song-input" 
                                            id="youTubeIdInput" 
                                            defaultValue={initYouTubeId}
                                            onChange={handleYouTubeIdChange} 
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