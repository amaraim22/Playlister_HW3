import jsTPS_Transaction from "../common/jsTPS.js"
/**
 * MoveSong_Transaction
 * 
 * This class represents a transaction that works with drag
 * and drop. It will be managed by the transaction stack.
 * 
 * @author McKilla Gorilla
 * @author Amara Im
 */
export default class MoveSong_Transaction extends jsTPS_Transaction {
    constructor(initStore, initOldIndex, initNewIndex) {
        super();
        this.store = initStore;
        this.oldIndex = initOldIndex;
        this.newIndex = initNewIndex;
    }

    doTransaction() {
        this.store.moveSong(this.oldIndex, this.newIndex);
    }
    
    undoTransaction() {
        this.store.moveSong(this.newIndex, this.oldIndex);
    }
}