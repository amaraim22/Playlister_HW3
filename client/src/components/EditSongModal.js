import { GlobalStoreContext } from '../store'
import { useHistory } from 'react-router-dom'
import { useContext } from 'react'
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
    store.history = useHistory();

    let id = -1;
    let list = null;
    if (store.songToEdit) {
        id = store.songToEdit;
        list = store.currentList;
        document.getElementById("titleInput").value = store.currentList.songs[id].title;
        document.getElementById("artistInput").value = store.currentList.songs[id].artist;
        document.getElementById("youTubeIdInput").value = store.currentList.songs[id].youTubeId;
    }

    function handleEditSongConfirmed(event) {
        let newTitle = document.getElementById("titleInput").value;
        let newArtist = document.getElementById("artistInput").value;
        let newYouTubeId = document.getElementById("youTubeIdInput").value;
        
        let newSong = {title:newTitle, artist:newArtist, youTubeId:newYouTubeId};   
        store.newEditSongTransaction(store.songToEdit, newSong);
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
                                            type="text" /> <br></br>
                            Artist: <input className="edit-song-input" 
                                            id="artistInput" 
                                            type="text" /> <br></br>
                            youTubeId: <input className="edit-song-input" 
                                            id="youTubeIdInput" 
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