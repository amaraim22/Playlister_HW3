import jsTPS_Transaction from "../../common/jsTPS.js"
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
    constructor(initModel, initSongId, initNewSong) {
        super();
        this.model = initModel;
        this.songId = initSongId;
        this.newSong = initNewSong;
    }

    doTransaction() {
        this.oldSong = this.model.editSong(this.songId, this.newSong);
    }
    
    undoTransaction() {
        this.newSong = this.model.editSong(this.songId, this.oldSong);
    }
}