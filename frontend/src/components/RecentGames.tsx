import { useEffect, useMemo, useState } from 'react'

interface Match {
    id: number
    date: string
    start_time: string
    team1: string
    team2: string
    team1_score: number
    team2_score: number
}

interface RecentGamesProps {
    title: string
    apiUrl: string
    gameType: 'recent' | 'upcoming'
}

function getMatchStartMs(match: Match): number {
    const parsedStartMs = Date.parse(match.start_time)
    if (!Number.isNaN(parsedStartMs)) {
        return parsedStartMs
    }

    return Date.parse(`${match.date}T${match.start_time}`)
}

function RecentGames({ title, apiUrl, gameType }: RecentGamesProps) {
    const [matches, setMatches] = useState<Match[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        setIsLoading(true)
        setError(null)

        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch matches')
                }
                return response.json()
            })
            .then((data: Match[]) => {
                setMatches(data)
            })
            .catch((fetchError: unknown) => {
                const message = fetchError instanceof Error ? fetchError.message : 'Unknown error'
                setError(message)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [apiUrl])

    const preparedMatches = useMemo(() => {
        const nowMs = Date.now()

        if (gameType === 'upcoming') {
            return matches
                .filter((match) => {
                    const startMs = getMatchStartMs(match)
                    return !Number.isNaN(startMs) && startMs > nowMs
                })
                .sort((a, b) => getMatchStartMs(a) - getMatchStartMs(b))
                .slice(0, 20)
        }

        return matches
            .filter((match) => {
                const startMs = getMatchStartMs(match)
                return !Number.isNaN(startMs) && startMs <= nowMs
            })
            .sort((a, b) => getMatchStartMs(b) - getMatchStartMs(a))
            .slice(0, 20)
    }, [matches, gameType])

    if (isLoading) {
        return (
            <section className="recent-games">
                <h2>{title}</h2>
                <p>Loading games...</p>
            </section>
        )
    }

    if (error) {
        return (
            <section className="recent-games">
                <h2>{title}</h2>
                <p>Could not load games: {error}</p>
            </section>
        )
    }

    if (preparedMatches.length === 0) {
        return (
            <section className="recent-games">
                <h2>{title}</h2>
                <p>{gameType === 'upcoming' ? 'No upcoming games found.' : 'No completed games yet.'}</p>
            </section>
        )
    }

    return (
        <section className="recent-games">
            <h2>{title}</h2>
            <ul className="recent-games-list">
                {preparedMatches.map((match) => {
                    const startMs = getMatchStartMs(match)
                    const localStart = Number.isNaN(startMs)
                        ? `${match.date} ${match.start_time}`
                        : new Date(startMs).toLocaleString()

                    const hasScores =
                        typeof match.team1_score === 'number' &&
                        typeof match.team2_score === 'number'

                    return (
                        <li key={match.id} className="recent-games-item">
                            <div className="recent-games-row">
                                <span>
                                    {hasScores && gameType === 'recent'
                                        ? `${match.team1} ${match.team1_score} - ${match.team2_score} ${match.team2}`
                                        : `${match.team1} vs ${match.team2}`}
                                </span>
                                <span className="recent-games-status">
                                    {gameType === 'upcoming' ? 'UPCOMING' : 'FT'}
                                </span>
                            </div>
                            <div className="recent-games-time">{localStart}</div>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}

export default RecentGames
