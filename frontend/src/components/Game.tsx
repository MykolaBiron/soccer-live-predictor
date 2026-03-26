import { useState } from "react";
import GetMatch from "./getMatch"

interface MatchIdProps {
    matchId: number;
}
function Game({matchId}:MatchIdProps) {
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [name, setName] = useState('');
    return (<div className="game">
                <div className="game-upper">
                    <div className="league">

                    </div>
                    <div className="minute">

                    </div>
                    <GetMatch matchId={matchId}></GetMatch>
                </div>
            </div>)
}
export default Game