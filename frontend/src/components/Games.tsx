import Game from "./Game.tsx"
import type { Match } from "../App"

interface GamesProps {
    matches: Match[];
}
function Games({matches}: GamesProps) {
    const visibleMatches = matches.slice(0, 3);

    return (
        <section className="games">
            <div className="games-container">
                {visibleMatches.map((match, index) => (
                    <Game key={match.id ?? index} match={match}></Game>
                ))}
            </div> 
        </section>
    )
}

export default Games;