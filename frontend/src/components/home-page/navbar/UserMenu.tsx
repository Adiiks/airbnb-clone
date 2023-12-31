import styles from './navbar.module.css';
import { IoMdMenu } from "react-icons/io";
import { IoPersonCircle } from "react-icons/io5";
import { useContext, useState } from 'react';
import ModalObject, { ModalType } from '../../../models/Modal';
import Modal from '../../modals/Modal';
import { AuthContext } from '../../../store/auth-context';
import { Link, useNavigate } from 'react-router-dom';

const initialModalState: ModalObject = {
    showModal: false
}

const UserMenu = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const [modal, setModal] = useState<ModalObject>(initialModalState);

    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

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

    function handleAirbnbYourHomeClick() {
        if (!authContext.auth) {
            return setModal({
                showModal: true,
                type: ModalType.LOGIN
            });
        }

        navigate('/listing-creation');
    }

    return (
        <>
            <div id={styles["user-menu-container"]}>
                <div id={styles["user-menu-wrapper"]}>
                    <div id={styles["rent-home-link"]}>
                        <button onClick={handleAirbnbYourHomeClick}>Airbnb your home</button>
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
                            <Link to={'/my-trips'}>Trips</Link>
                        </div>
                        <div className={styles["user-menu-item"]}>
                        <Link to={'/wishlist'}>Wishlist</Link>
                        </div>
                        <div className={styles["user-menu-item"]}>
                            <Link to={'/listing-creation'}>Airbnb your home</Link>
                        </div>
                        <hr />
                        <div className={styles["user-menu-item"]}>
                            <button onClick={(handleLogoutClick)}>Log out</button>
                        </div>
                    </div>
                }
            </div>
            {modal.showModal && <Modal type={modal.type!} onClose={handleCloseModalClick} />}
        </>
    );
}

export default UserMenu;