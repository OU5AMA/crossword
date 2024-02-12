import './App.css'
import CrossWordPuzzle from './CrossWordPuzzle'

function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={CrossWordPuzzle} />
        <Route path="/admin-login" component={AdminLogin} />
      </Switch>
    </Router>
  )
}

export default App
