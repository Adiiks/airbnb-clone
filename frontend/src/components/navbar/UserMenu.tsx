import styles from './navbar.module.css';
import { IoMdMenu } from "react-icons/io";
import { IoPersonCircle } from "react-icons/io5";
import { useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import ModalObject, { ModalType } from '../../models/Modal';
import Modal from '../modals/Modal';
import { AuthContext } from '../../store/auth-context';

const initialModalState: ModalObject = {
    showModal: false
}

const UserMenu = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const [modal, setModal] = useState<ModalObject>(initialModalState);

    const authContext = useContext(AuthContext);

    function handleMenuClick() {
        setOpenMenu(prevOpenMenu => !prevOpenMenu);
    }

    function handleCloseModalClick() {
        setModal({
            showModal: false
        });
    }

    function handleAuthClick(type: ModalType) {
        setModal({
            showModal: true,
            type: type
        });

        handleMenuClick();
    }

    function handleLogoutClick() {
        setOpenMenu(false);
        authContext.setAuth(null)
    }

    return (
        <>
            <div id={styles["user-menu-container"]}>
                <div id={styles["user-menu-wrapper"]}>
                    <div id={styles["rent-home-link"]}>
                        <a>Airbnb your home</a>
                    </div>
                    <div id={styles["user-menu"]} onClick={handleMenuClick}>
                        <IoMdMenu size={20} />
                        {!authContext.auth ?
                            <IoPersonCircle size={30} className={styles["default-user-icon"]} /> 
                            :
                            <div className={styles["user-icon"]}>
                                {authContext.auth.fullName.charAt(0).toUpperCase()}
                            </div>
                        }
                    </div>
                </div>
                {(openMenu && !authContext.auth) &&
                    <div id={styles["open-menu"]}>
                        <div className={styles["user-menu-item"]}>
                            <button onClick={() => handleAuthClick(ModalType.SIGN_UP)}>Sign up</button>
                        </div>
                        <div className={styles["user-menu-item"]}>
                            <button onClick={() => handleAuthClick(ModalType.LOGIN)}>Log in</button>
                        </div>
                    </div>
                }
                {(openMenu && authContext.auth) &&
                    <div id={styles["open-menu"]}>
                        <div className={styles["user-menu-item"]}>
                            <a>Trips</a>
                        </div>
                        <div className={styles["user-menu-item"]}>
                            <a>Wishlist</a>
                        </div>
                        <div className={styles["user-menu-item"]}>
                            <a>Your reservations</a>
                        </div>
                        <div className={styles["user-menu-item"]}>
                            <a>Airbnb your home</a>
                        </div>
                        <hr />
                        <div className={styles["user-menu-item"]}>
                            <button onClick={(handleLogoutClick)}>Log out</button>
                        </div>
                    </div>
                }
            </div>
            {modal.showModal && createPortal(
                <Modal type={modal.type!} onClose={handleCloseModalClick} />,
                document.getElementById('root')!
            )}
        </>
    );
}

export default UserMenu;