import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import SongCard from './SongCard.js'
import { GlobalStoreContext } from '../store'
import DeleteSongModal from './DeleteSongModal'
import EditSongModal from './EditSongModal'

/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function PlaylistCards() {
    const { store } = useContext(GlobalStoreContext);

    store.history = useHistory();
    
    if(store.currentList == null) {
        store.history.push("/");
        return null
    }

    /*function handleOnKeyDown(event) {
        if (event.ctrlKey && event.key === 'z') {
            store.undo();
        }
        else if (event.ctrlKey && event.key === 'y') {
            store.redo();
        }
    }
    function mountComponent() {
        document.addEventListener("keydown", handleOnKeyDown);
    }
    onKeyDown={mountComponent()}*/

    return (
        <div id="playlist-cards">
        {
            store.currentList.songs.map((song, index) => (
                <SongCard
                    id={'playlist-song-' + (index)}
                    key={'playlist-song-' + (index)}
                    index={index}
                    song={song}
                />
            ))
        }
        <DeleteSongModal />
        <EditSongModal />
            
        </div>
    )
}

export default PlaylistCards;