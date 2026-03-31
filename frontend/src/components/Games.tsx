import Game from "./Game.tsx"

interface GamesProps {
    matchIds: number[];
}
function Games({matchIds}: GamesProps) {
    const visibleMatchIds = matchIds
        .filter((id): id is number => Number.isFinite(id))
        .slice(0, 3);

    return (
        <section className="games">
            <div className="games-container">
                {visibleMatchIds.map((matchId) => (
                    <Game key={matchId} matchId={matchId}></Game>
                ))}
            </div> 
        </section>
    )
}

export default Games;