import styles from './navbar.module.css';
import { IoMdMenu } from "react-icons/io";
import { IoPersonCircle } from "react-icons/io5";
import OpenUserMenu from './OpenUserMenu';
import { useState } from 'react';

const UserMenu = () => {
    const [openMenu, setOpenMenu] = useState(false);

    function handleMenuClick() {
        setOpenMenu(prevOpenMenu => !prevOpenMenu);
    }

    return (
        <div id={styles["user-menu-container"]}>
            <div id={styles["user-menu-wrapper"]}>
                <div id={styles["rent-home-link"]}>
                    <a>Airbnb your home</a>
                </div>
                <div id={styles["user-menu"]} onClick={handleMenuClick}>
                    <IoMdMenu size={20} />
                    <IoPersonCircle size={30} id={styles.avatar} />
                </div>
            </div>
            {openMenu && <OpenUserMenu />}
        </div>
    );
}

export default UserMenu;