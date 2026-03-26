import Game from "./Game.tsx"

function Games() {
    return (
        <section className="games">
            <div className="games-container">
                <Game matchId={1}></Game>
                <Game matchId={2}></Game>
                <Game matchId={3}></Game>
            </div> 
        </section>
    )
}

export default Games;