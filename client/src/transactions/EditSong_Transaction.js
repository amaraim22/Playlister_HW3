import jsTPS_Transaction from "../common/jsTPS.js"
/**
 * EditSong_Transaction
 * 
 * This class represents a transaction that works with editing songs.
 * It will be managed by the transaction stack.
 * 
 * @author McKilla Gorilla
 * @author Amara Im
 */
export default class EditSong_Transaction extends jsTPS_Transaction {
    constructor(initStore, initSongId, initNewSong) {
        super();
        this.store = initStore;
        this.songId = initSongId;
        this.newSong = initNewSong;
        this.oldSong = null;
    }

    doTransaction() {
        this.oldSong = this.store.editSong(this.songId, this.newSong);
    }
    
    undoTransaction() {
        this.newSong = this.store.editSong(this.songId, this.oldSong);
    }
}