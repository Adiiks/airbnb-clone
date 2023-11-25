import styles from './navbar.module.css';

const OpenUserMenu = () => {
    return (
        <div id={styles["open-menu"]}>
            <div className={styles["user-menu-item"]}>
                <button>Sign up</button>
            </div>
            <div className={styles["user-menu-item"]}>
                <button>Log in</button>
            </div>
            <div className={styles["user-menu-item"]}>
                <a>Airbnb your home</a>
            </div>
        </div>
    );
}

export default OpenUserMenu;