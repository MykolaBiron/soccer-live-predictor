import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Header from './components/Header'
import Games from './components/Games'
import Navbar from './components/navBar'
import SeeMoreButton from './components/SeeMoreButton'

function App() {
  return (<>
            <Navbar></Navbar>
            <Header></Header>
            <Games></Games>
            <SeeMoreButton></SeeMoreButton>
          </>)
}
export default App;

