import GetMatch from "./getMatch"

interface MatchIdProps {
    matchId: number;
}
function Game({matchId}:MatchIdProps) {
    return (<div className="game">
                <div className="game-upper">
                    <div className="league">

                    </div>
                    <GetMatch matchId={matchId}></GetMatch>
                </div>
            </div>)
}
export default Game