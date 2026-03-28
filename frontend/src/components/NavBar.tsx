function Navbar() {
    return (
        <nav className="nav-main" aria-label="Main navigation">
            <ul className="menu-list">
                <li><a className="menu-link" href="#recent-games">Recent Games</a></li>
                <li><a className="menu-link" href="#live">Live</a></li>
                <li><a className="menu-link" href="#upcoming-games">Upcoming Games</a></li>
            </ul>
        </nav>
    )
}
export default Navbar;