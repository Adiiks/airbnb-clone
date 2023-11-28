import styles from './navbar.module.css';
import { IoMdMenu } from "react-icons/io";
import { IoPersonCircle } from "react-icons/io5";
import { useState } from 'react';
import { createPortal } from 'react-dom';
import ModalObject, { ModalType } from '../../models/Modal';
import Modal from '../modals/Modal';

const initialModalState: ModalObject = {
    showModal: false
}

const UserMenu = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const [modal, setModal] = useState<ModalObject>(initialModalState);

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

    return (
        <>
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
                {openMenu &&
                    <div id={styles["open-menu"]}>
                        <div className={styles["user-menu-item"]}>
                            <button onClick={() => handleAuthClick(ModalType.SIGN_UP)}>Sign up</button>
                        </div>
                        <div className={styles["user-menu-item"]}>
                            <button onClick={() => handleAuthClick(ModalType.LOGIN)}>Log in</button>
                        </div>
                        <div className={styles["user-menu-item"]}>
                            <a>Airbnb your home</a>
                        </div>
                    </div>
                }
            </div>
            {modal.showModal && createPortal(
                <Modal type={modal.type!} onClose={handleCloseModalClick} />,
                document.body
            )}
        </>
    );
}

export default UserMenu;