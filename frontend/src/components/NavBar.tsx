import { NavLink } from 'react-router-dom'

function Navbar() {
    return (
        <nav className="nav-main" aria-label="Main navigation">
            <ul className="menu-list">
                <li>
                    <NavLink
                        to="/recent-games"
                        className={({ isActive }) => (isActive ? 'menu-link active' : 'menu-link')}>
                        Recent Games
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) => (isActive ? 'menu-link active' : 'menu-link')}>
                        Live
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/upcoming-games"
                        className={({ isActive }) => (isActive ? 'menu-link active' : 'menu-link')}>
                        Upcoming Games
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}
export default Navbar;