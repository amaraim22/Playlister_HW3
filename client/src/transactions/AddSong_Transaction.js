import jsTPS_Transaction from "../common/jsTPS.js"
/**
 * AddSong_Transaction
 * 
 * This class represents a transaction that works with adding new songs. 
 * It will be managed by the transaction stack.
 * 
 * @author McKilla Gorilla
 * @author Amara Im
 */
export default class AddSong_Transaction extends jsTPS_Transaction {
    constructor(initStore, initNewIdx, initNewSong) {
        super();
        this.store = initStore;
        this.newSong = initNewSong;
        this.songId = initNewIdx;
    }

    doTransaction() {
        this.songId = this.store.addSong(this.songId, this.newSong);
    }
    
    undoTransaction() {
        this.newSong = this.store.deleteSong(this.songId);
    }
}