import { useEffect, useState } from "react"
import type { Match } from "../App"

interface MatchIdProps {
    match: Match;
}
function getStartMs(match: Match): number {
    const direct = Date.parse(match.start_time);
    if (!Number.isNaN(direct)) {
        return direct;
    }

    const fallback = Date.parse(`${match.date}T${match.start_time}`);
    return Number.isNaN(fallback) ? Date.now() : fallback;
}

function Game({match}:MatchIdProps) {
    const [now, setNow] = useState<number>(Date.now());

    useEffect(() => {
        const intervalId = setInterval(() => setNow(Date.now()), 60000);
        return () => clearInterval(intervalId);
    }, []);

    const elapsedMinutes = Math.max(0, Math.min(110, Math.floor((now - getStartMs(match)) / 60000)));
    const minuteMessage = elapsedMinutes >= 110 ? "finished" : `${elapsedMinutes}'`;

    return (<div className="game">
                <div className="game-upper">
                    <div className="league">

                    </div>
                    <div className={elapsedMinutes < 110 ? "minute": "minute m-finished"}>
                        {minuteMessage}
                    </div>
                </div>
                <div className="match-data">
                    <div>
                        {match.team1.replace(" FC", "")} {match.team1_score} - {match.team2_score} {match.team2.replace(" FC", "")}
                    </div>
                    <div>
                        {match.date}
                    </div>
                </div>
            </div>)
}
export default Game