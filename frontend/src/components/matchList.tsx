import { useEffect, useState } from 'react'

interface Match {
    id: number,
    date: string,
    start_time: string,
    team1: string, 
    team2: string,
    team1_score: number,
    team2_score: number;

}
function MatchList()  {
    const [matches, setMatches] = useState<Match[]>([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/matches")
            .then((response) => response.json())
            .then((data: Match[]) => setMatches(data))
            .catch((error: unknown) => console.error(error));
    }, []);

    return (
        <section className="">
            {matches.map(match => 
                    <li key={match.id}>
                        {match.team1_score} - {match.team2_score}
                    </li>)}
        </section>
    )
}
export default MatchList