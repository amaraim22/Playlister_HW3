import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
/*
    This modal is shown when the user asks to delete a list. Note 
    that before this is shown a list has to be marked for deletion,
    which means its id has to be known so that we can retrieve its
    information and display its name in this modal. If the user presses
    confirm, it will be deleted.
    
    @author McKilla Gorilla
*/
function DeleteSongModal() {
    const { store } = useContext(GlobalStoreContext);
    let songName = "";

    let id = -1;
    let list = null;
    if (store.songMarkedForDeletion) {
        id = store.songMarkedForDeletion;
        list = store.currentList;
        songName = store.currentList.songs[id].title;
    }
    function handleDeleteSong(event) {
        store.newDeleteSongTransaction(store.songMarkedForDeletion);
    }
    function handleCloseModal(event) {
        store.hideDeleteSongModal();
        store.setCurrentList(list._id);
    }
    return (
        <div 
            className="modal" 
            id="delete-song-modal" 
            data-animation="slideInOutLeft">
            <div className="modal-root" id='verify-delete-list-root'>
                <div className="modal-north modal-prompt">
                    Remove Song?
                </div>
                <div className="modal-center">
                    <div className="modal-center-content modal-textfield">
                        Are you sure you wish to remove {songName} from the playlist?
                    </div>
                </div>
                <div className="modal-south">
                    <button
                        id="dialog-yes-button"
                        className="modal-button"
                        onClick={handleDeleteSong}
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

export default DeleteSongModal;