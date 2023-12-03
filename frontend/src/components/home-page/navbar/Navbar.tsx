import styles from './navbar.module.css';
import Logo from './Logo';
import SearchBar from './SearchBar';
import UserMenu from './UserMenu';
import Categories from './Categories';

const Navbar = () => {
    return (
        <header>
            <div id={styles["main-bar"]}>
                <Logo />
                <SearchBar />
                <UserMenu />
            </div>
            <Categories />
        </header>
    );
}

export default Navbar;