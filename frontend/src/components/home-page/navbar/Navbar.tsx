import styles from './navbar.module.css';
import Logo from './Logo';
import SearchBar from './SearchBar';
import UserMenu from './UserMenu';
import Categories from './Categories';
import React from 'react';

type Props = {
    showCategories?: boolean,
    fixedHeader?: boolean,
    showSearchBar?: boolean
}

const Navbar: React.FC<Props> = ({ showCategories, fixedHeader, showSearchBar }) => {
    return (
        <header className={fixedHeader ? styles['fixed-header'] : ''}>
            <div id={styles["main-bar"]}>
                <Logo showLogoOnMobile={showSearchBar ? false : true} />
                {showSearchBar && <SearchBar />}
                <UserMenu />
            </div>
            {showCategories && <Categories />}
        </header>
    );
}

Navbar.defaultProps = {
    showCategories: true,
    showSearchBar: true
}

export default Navbar;