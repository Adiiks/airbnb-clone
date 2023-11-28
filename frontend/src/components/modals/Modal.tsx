import { ModalType } from '../../models/Modal';
import AuthModalBody from './AuthModalBody';
import styles from './modals.module.css';
import { IoCloseOutline } from "react-icons/io5";

interface ModalProps {
    type: ModalType,
    onClose: () => void
}

const Modal: React.FC<ModalProps> = ({ type, onClose }) => {
    let modalBody;

    switch(type) {
        case ModalType.SIGN_UP: {
            modalBody = <AuthModalBody  isLogin={false} />;
            break;
        }
        case ModalType.LOGIN: {
            modalBody = <AuthModalBody  isLogin={true}/>;
            break;
        }
    }

    return (
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
        </div>
    );
}

export default Modal;