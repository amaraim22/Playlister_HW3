import jsTPS_Transaction from "../../common/jsTPS.js"
/**
 * RemoveSong_Transaction
 * 
 * This class represents a transaction that works with removing songs.
 * It will be managed by the transaction stack.
 * 
 * @author McKilla Gorilla
 * @author Amara Im
 */
export default class RemoveSong_Transaction extends jsTPS_Transaction {
    constructor(initModel, initSongId) {
        super();
        this.model = initModel;
        this.songId = initSongId;
        this.removedSong = null;
    }

    doTransaction() {
        this.removedSong = this.model.removeSong(this.songId);
    }
    
    undoTransaction() {
        this.songId = this.model.addSong(this.songId, this.removedSong);
    }
}