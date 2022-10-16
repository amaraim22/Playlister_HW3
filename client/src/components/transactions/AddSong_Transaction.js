import jsTPS_Transaction from "../../common/jsTPS.js"
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
    constructor(initModel, initNewSong) {
        super();
        this.model = initModel;
        this.newSong = initNewSong;
    }

    doTransaction() {
        this.newSongId = this.model.getPlaylistSize();
        this.songId = this.model.addSong(this.newSongId, this.newSong);
    }
    
    undoTransaction() {
        this.newSong = this.model.removeSong(this.songId);
    }
}