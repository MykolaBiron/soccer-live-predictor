import './App.css'
import Header from './components/Header'
import Games from './components/Games'
import SeeMoreButton from './components/SeeMoreButton'
import MatchList from './components/matchList'
import ListGroup from './components/ListGroup'
import Navbar from './components/navBar'

function App() {
  let items = ["SanFrancisco", "New York", "Seattle", "Paris", "Los Angeles"]
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

