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
interface GetMatchProps {
    matchId: number;
}
function GetMatch({matchId}:GetMatchProps) {
    const[match, setMatch] = useState<Match|null>(null);
    useEffect(() => {
    fetch(`http://localhost:8080/api/matches/${matchId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            console.log("Data received:", data); // Check your console!
            setMatch(data);
        })
        .catch(error => {
            console.error("There was a problem with the fetch operation:", error);
        });
}, [matchId]);

    if (!match) {
        return <div>Loading match...</div>;
    }

    return (
        <div>
            {match.team1} {match.team1_score} - {match.team2_score} {match.team2}
        </div>
    );
}
export default GetMatch;