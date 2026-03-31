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
    const [now, setNow] = useState<number>(Date.now());

    useEffect(() => {
    if (!Number.isFinite(matchId)) {
        return;
    }

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

    useEffect(() => {
        const intervalId = setInterval(() => setNow(Date.now()), 60000);
        return () => clearInterval(intervalId);
    }, []);

    if (!match) {
        return <div>Loading match...</div>;
    }

    const parsedStartMs = Date.parse(match.start_time);
    const fallbackStartMs = Date.parse(`${match.date}T${match.start_time}`);
    const startMs = Number.isNaN(parsedStartMs) ? fallbackStartMs : parsedStartMs;
    let elapsedMinutes = Number.isNaN(startMs)
        ? 0
        : Math.max(0, Math.floor((now - startMs) / 60000));
    elapsedMinutes = Math.min(elapsedMinutes, 110)
    let minuteMessage = `${elapsedMinutes}`;
    if (elapsedMinutes == 110) {
        minuteMessage = "finished";
    }

    return (
        <>
            <div className={elapsedMinutes < 110 ? "minute": "minute m-finished"}>
                {minuteMessage}'
            </div>
            <div>
                {match.team1.replace(" FC", "")} {match.team1_score} - {match.team2_score} {match.team2.replace(" FC", "")}
            </div>
            <div>
                {match.date}
            </div>
        </>
    );
}
export default GetMatch;