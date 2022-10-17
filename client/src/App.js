import './App.css';
import { React, useContext } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Banner, ListSelector, PlaylistCards, Statusbar } from './components'
import { GlobalStoreContext } from './store'
/*
    This is our application's top-level component.
    
    @author McKilla Gorilla
*/
const App = () => {

    const { store } = useContext(GlobalStoreContext);
    document.onkeydown = handleAppKeyDown;

    function handleAppKeyDown(event) {
        if (event.ctrlKey && event.key === 'z') {
            if(store.canUndo)
                store.undo();
        }
        else if (event.ctrlKey && event.key === 'y') {
            if(store.canRedo)
                store.redo();
        }
    }

    return (
        <Router>
            <Banner />
            <Switch>
                <Route path="/" exact component={ListSelector} />
                <Route path="/playlist/:id" exact component={PlaylistCards} />
            </Switch>
            <Statusbar />
        </Router>
    )
}

export default App