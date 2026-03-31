import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Games from './components/Games'
import SeeMoreButton from './components/SeeMoreButton'
import MatchList from './components/matchList'
import Navbar from './components/Navbar'
import RecentGames from './components/RecentGames'
import { useEffect, useState } from 'react'


export interface Match {
    id: number,
    date: string,
    start_time: string,
    team1: string, 
    team2: string,
    team1_score: number,
    team2_score: number;

}

function getMatchTimestamp(match: Match): number {
  const parsedStartMs = Date.parse(match.start_time);
  if (!Number.isNaN(parsedStartMs)) {
    return parsedStartMs;
  }

  const fallbackStartMs = Date.parse(`${match.date}T${match.start_time}`);
  return Number.isNaN(fallbackStartMs) ? 0 : fallbackStartMs;
}

function LivePage() {
  const [matches, setMatches] = useState<Match[]>([]);
  
      useEffect(() => {
          fetch("http://localhost:8080/api/matches")
              .then((response) => response.json())
              .then((data: Match[]) => setMatches(data))
              .catch((error: unknown) => console.error(error));
      }, []);

  const recentMatches = [...matches]
    .sort((a, b) => getMatchTimestamp(b) - getMatchTimestamp(a))
    .slice(0, 3);


  return (
    <>
      <Header></Header>
      <Games matches={recentMatches}></Games>
      <SeeMoreButton></SeeMoreButton>
    </>
  )
}

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<LivePage />}></Route>
        <Route path="/recent-games" element={<RecentGames />}></Route>
        <Route path="*" element={<Navigate to="/" replace />}></Route>
      </Routes>
    </>
  )
}
export default App

