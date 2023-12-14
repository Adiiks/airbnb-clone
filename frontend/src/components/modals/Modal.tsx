import { createPortal } from 'react-dom';
import { ModalType } from '../../models/Modal';
import LoginModalBody from './LoginModalBody';
import RegistrationModalBody from './RegistrationModalBody';
import styles from './modals.module.css';
import { IoCloseOutline } from "react-icons/io5";
import FiltersModalBody from './FiltersModalBody';

interface ModalProps {
    type: ModalType,
    onClose: () => void
}

const Modal: React.FC<ModalProps> = ({ type, onClose }) => {
    let modalBody;

    switch (type) {
        case ModalType.SIGN_UP: {
            modalBody = <RegistrationModalBody onClose={onClose} />;
            break;
        }
        case ModalType.LOGIN: {
            modalBody = <LoginModalBody onClose={onClose} />;
            break;
        }
        case ModalType.FILTERS: {
            modalBody = <FiltersModalBody onClose={onClose} />
            break;
        }
    }

    return (
        createPortal(
        <div id={styles["modal-background"]}>
            <div id={styles["modal-container"]}>
                <div id={styles["modal-header"]}>
                    <button id={styles["close-btn"]} onClick={onClose}>
                        <IoCloseOutline size={25} />
                    </button>
                    <h3 id={styles["modal-title"]}>{type}</h3>
                </div>
                <div id={styles["modal-body"]}>
                    {modalBody}
                </div>
            </div>
        </div>,
        document.getElementById('root')!)
    );
}

export default Modal;