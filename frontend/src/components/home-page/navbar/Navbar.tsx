import styles from './navbar.module.css';
import Logo from './Logo';
import SearchBar from './SearchBar';
import UserMenu from './UserMenu';
import Categories from './Categories';
import React from 'react';

type Props = {
    showCategories?: boolean,
    fixedHeader?: boolean
}

const Navbar: React.FC<Props> = ({ showCategories, fixedHeader }) => {
    return (
        <header className={fixedHeader ? styles['fixed-header'] : ''}>
            <div id={styles["main-bar"]}>
                <Logo />
                <SearchBar />
                <UserMenu />
            </div>
            {showCategories && <Categories />}
        </header>
    );
}

Navbar.defaultProps = {
    showCategories: true
}

export default Navbar;