import { Route, Switch } from 'react-router-dom'
import Header from './components/Header/Header'
import Dashboard from './components/Dashboard/Dashboard'
import PlaylistDetails from './components/Playlist/PlaylistDetails/PlaylistDetails'

function App() {
  return (
    <>
      <div className="app">
        <Header />

        <Switch>
          <Route path="/" exact component={Dashboard}/>
          <Route path="/playlist/:id/details" component={PlaylistDetails}/>
        </Switch>

      </div>

      <style jsx="true">{`
      .app{
          margin-top:73px;
          padding-bottom:50px;
          min-height:100%;
          
      }
      html body{
        height:100%;
        background-color:#1e2124;
        
      }
      `}</style>
    </>
  );
}

export default App;
