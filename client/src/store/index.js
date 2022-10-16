import { createContext, useState } from 'react'
import jsTPS from '../common/jsTPS'
import api from '../api'
export const GlobalStoreContext = createContext({});
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    UPDATE_PLAYLIST: "UPDATE_PLAYLIST",
    MARK_SONG_FOR_DELETION: "MARK_SONG_FOR_DELETION",
    SONG_TO_EDIT: "SONG_TO_EDIT"
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
export const useGlobalStore = () => {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        idNamePairs: [],
        currentList: null,
        newListCounter: 0,
        listMarkedForDeletion: null,
        songMarkedForDeletion: null,
        songToEdit: null,
        listNameActive: false
    });

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    idNamePairs: payload.idNamePairs,
                    currentList: payload.playlist,
                    newListCounter: store.newListCounter,
                    listMarkedForDeletion: null,
                    songMarkedForDeletion: null,
                    songToEdit: null,
                    listNameActive: false
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listMarkedForDeletion: null,
                    songMarkedForDeletion: null,
                    songToEdit: null,
                    listNameActive: false
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter + 1,
                    listMarkedForDeletion: null,
                    songMarkedForDeletion: null,
                    songToEdit: null,
                    listNameActive: false
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listMarkedForDeletion: null,
                    songMarkedForDeletion: null,
                    songToEdit: null,
                    listNameActive: false
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listMarkedForDeletion: payload,
                    songMarkedForDeletion: null,
                    songToEdit: null,
                    listNameActive: false
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listMarkedForDeletion: null,
                    songMarkedForDeletion: null,
                    songToEdit: null,
                    listNameActive: false
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listMarkedForDeletion: null,
                    songMarkedForDeletion: null,
                    songToEdit: null,
                    listNameActive: true
                });
            }
            case GlobalStoreActionType.UPDATE_PLAYLIST: {
                return setStore({
                    idNamePairs: payload.idNamePairs,
                    currentList: payload.playlist,
                    newListCounter: store.newListCounter,
                    listMarkedForDeletion: null,
                    songMarkedForDeletion: null,
                    songToEdit: null,
                    listNameActive: false
                });
            }
            case GlobalStoreActionType.MARK_SONG_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload.currentList,
                    newListCounter: store.newListCounter,
                    listMarkedForDeletion: null,
                    songMarkedForDeletion: payload.songId,
                    songToEdit: null,
                    listNameActive: false
                });
            }
            case GlobalStoreActionType.SONG_TO_EDIT: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload.currentList,
                    newListCounter: store.newListCounter,
                    listMarkedForDeletion: null,
                    songMarkedForDeletion: null,
                    songToEdit: payload.songId,
                    listNameActive: false
                });
            }
            default:
                return store;
        }
    }
    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = function (id, newName) {
        // GET THE LIST
        async function asyncChangeListName(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                playlist.name = newName;
                async function updateList(playlist) {
                    response = await api.updatePlaylist(playlist._id, playlist);
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                    payload: {
                                        idNamePairs: pairsArray,
                                        playlist: playlist
                                    }
                                });
                            }
                        }
                        getListPairs(playlist);
                    }
                }
                updateList(playlist);
            }
        }
        asyncChangeListName(id);
    }

    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
    }

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = function () {
        async function asyncLoadIdNamePairs() {
            const response = await api.getPlaylistPairs();
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: pairsArray
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncLoadIdNamePairs();
    }

    store.createNewList = function () {
        async function asyncCreateNewList() {
            let payload = { name: "Untitled", songs: [] };
            let response = await api.createPlaylist(payload);
            if (response.data.success) {
                let newPlaylist = response.data.playlist;
                if (response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.CREATE_NEW_LIST,
                        payload: newPlaylist
                    });
                    store.history.push("/playlist/" + newPlaylist._id);
                }
            }
        }
        asyncCreateNewList();       
    }

    store.deleteList = function (id) {
        async function asyncDeleteList(id) {
            let response = await api.deletePlaylist(id);
            if (response.data.success) {
                store.loadIdNamePairs();
                store.history.push("/");
            }
        }
        asyncDeleteList(id);
    }

    store.deleteMarkedList = function () {
        store.deleteList(store.listMarkedForDeletion._id);
        store.hideDeleteListModal();
    }

    store.markListForDeletion = function (id) {
        async function asyncMarkListForDeletion(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                storeReducer({
                    type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
                    payload: playlist
                });
                store.showDeleteListModal();
            }
        }
        asyncMarkListForDeletion(id);   
    }

    store.setCurrentList = function (id) {
        async function asyncSetCurrentList(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                if (response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.SET_CURRENT_LIST,
                        payload: playlist
                    });
                    store.history.push("/playlist/" + playlist._id);
                }
            }
        }
        asyncSetCurrentList(id);
    }

    store.addSong = function (id, song) {
        let playlistToUpdate = store.currentList;
        playlistToUpdate.songs.splice(id, 0, song);

        store.updatePlaylist(playlistToUpdate);
    }

    store.newAddSongTransaction = () => {
        let newSongId = store.currentList.songs.length;
        let newSong = {title:"Untitled", artist:"Unknown", youTubeId:"dQw4w9WgXcQ"};

        store.addSong(newSongId, newSong);
    }

    store.deleteSong = function (id) {
        let playlistToUpdate = store.currentList;
        playlistToUpdate.songs.splice(id, 1);
        
        store.updatePlaylist(playlistToUpdate);
    }

    store.markSongForDeletion = function (id) {      
        storeReducer({
            type: GlobalStoreActionType.MARK_SONG_FOR_DELETION,
            payload: {
                currentList: store.currentList,
                songId: id
            }
        }); 
        store.showDeleteSongModal();
    }

    store.newDeleteSongTransaction = (id) => {
        store.deleteSong(id);
        store.hideDeleteSongModal();
    }

    store.editSong = function (id, newSong) {
        let playlistToUpdate = store.currentList;
        playlistToUpdate.songs[id].title = newSong.title;
        playlistToUpdate.songs[id].artist = newSong.artist;
        playlistToUpdate.songs[id].youTubeId = newSong.youTubeId;
        
        store.updatePlaylist(playlistToUpdate);
    }

    store.editSongActive = function(id) {
        storeReducer({
            type: GlobalStoreActionType.SONG_TO_EDIT,
            payload: {
                currentList: store.currentList,
                songId: id
            }
        }); 
        store.showEditSongModal();
    }

    store.newEditSongTransaction = (id, newSong) => {
        store.editSong(id, newSong);
        store.hideEditSongModal();
    }

    store.moveSong = (start, end) => {
        let songs = store.currentList.songs;
        
        if (start < end) {
            let temp = songs[start];
            for (let i = start; i < end; i++) {
                songs[i] = songs.at(i + 1);
            }
            songs[end] = temp;
        }
        else if (start > end) {
            let temp = songs[start];
            for (let i = start; i > end; i--) {
                songs[i] = songs.at(i - 1);
            }
            songs[end] = temp;
        }

        store.currentList.songs = songs;
        store.updatePlaylist(store.currentList);
    }

    store.newMoveSongTransaction = (start, end) => {
        store.moveSong(start, end)
    }

    store.updatePlaylist = function (playlistToUpdate) {
        async function asyncUpdatePlaylist(playlistToUpdate) {          
            let response = await api.updatePlaylist(playlistToUpdate._id, playlistToUpdate);
            if (response.data.success) {
                async function getListPairs(playlistToUpdate) {
                    response = await api.getPlaylistPairs();
                    if (response.data.success) {
                        let pairsArray = response.data.idNamePairs;
                        storeReducer({
                            type: GlobalStoreActionType.UPDATE_PLAYLIST,
                            payload: {
                                idNamePairs: pairsArray,
                                playlist: playlistToUpdate
                            }
                        });
                        store.history.push("/playlist/" + playlistToUpdate._id);
                    }
                }
                getListPairs(playlistToUpdate);
            } 
        }
        asyncUpdatePlaylist(playlistToUpdate);
    }

    store.getPlaylistSize = function() {
        return store.currentList.songs.length;
    }

    store.undo = function () {
        tps.undoTransaction();
    }

    store.redo = function () {
        tps.doTransaction();
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setIsListNameEditActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }

    store.showDeleteListModal = function() {
        let modal = document.getElementById("delete-list-modal");
        modal.classList.add("is-visible");
    }
    store.hideDeleteListModal = function() {
        let modal = document.getElementById("delete-list-modal");
        modal.classList.remove("is-visible");
    }

    store.showDeleteSongModal = function() {
        let modal = document.getElementById("delete-song-modal");
        modal.classList.add("is-visible");
    }
    store.hideDeleteSongModal = function() {
        let modal = document.getElementById("delete-song-modal");
        modal.classList.remove("is-visible");
    }

    store.showEditSongModal = function() {
        let modal = document.getElementById("edit-song-modal");
        modal.classList.add("is-visible");
    }
    store.hideEditSongModal = function() {
        let modal = document.getElementById("edit-song-modal");
        modal.classList.remove("is-visible");
    }

    // THIS GIVES OUR STORE AND ITS REDUCER TO ANY COMPONENT THAT NEEDS IT
    return { store, storeReducer };
}