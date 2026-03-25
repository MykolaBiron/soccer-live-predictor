import './App.css'
import Header from './components/Header'
import Games from './components/Games'
import Navbar from './components/navBar'
import SeeMoreButton from './components/SeeMoreButton'
import MatchList from './components/matchList'

function App() {
  return (<>
            <Navbar></Navbar>
            <Header></Header>
            <Games></Games>
            <MatchList></MatchList>
            <SeeMoreButton></SeeMoreButton>
          </>)
}
export default App;

