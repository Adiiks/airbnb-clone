import classes from './navbar.module.css';
import Logo from './Logo';
import SearchBar from './SearchBar';
import UserMenu from './UserMenu';

const Navbar = () => {
    return (
        <header className={classes.navbar}>
            <Logo />
            <SearchBar />
            <UserMenu />
        </header>
    );
}

export default Navbar;