import jsTPS_Transaction from "../common/jsTPS.js"
/**
 * RemoveSong_Transaction
 * 
 * This class represents a transaction that works with removing songs.
 * It will be managed by the transaction stack.
 * 
 * @author McKilla Gorilla
 * @author Amara Im
 */
export default class DeleteSong_Transaction extends jsTPS_Transaction {
    constructor(initStore, initSongId) {
        super();
        this.store = initStore;
        this.songId = initSongId;
        this.removedSong = null;
    }

    doTransaction() {
        this.removedSong = this.store.deleteSong(this.songId);
    }
    
    undoTransaction() {
        this.songId = this.store.addSong(this.songId, this.removedSong);
    }
}