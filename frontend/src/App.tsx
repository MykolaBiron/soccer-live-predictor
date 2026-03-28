import './App.css'
import Header from './components/Header'
import Games from './components/Games'
import SeeMoreButton from './components/SeeMoreButton'
import MatchList from './components/matchList'
import ListGroup from './components/ListGroup'
import Navbar from './components/Navbar'

function App() {
  let items = ["SanFrancisco", "New York", "Paris", "Seattle"]
  return (<>
            <Navbar></Navbar>
            <Header></Header>
            <Games></Games>
            <MatchList></MatchList>
            <SeeMoreButton></SeeMoreButton>
            <ListGroup items={items} heading="cities" onSelectItem={(item) => console.log(item)}></ListGroup>
          </>)
}
export default App;

