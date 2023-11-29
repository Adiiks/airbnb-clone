export default class ModalObject {
    showModal: boolean;
    type?: ModalType

    constructor(showModal: boolean, type: ModalType) {
        this.showModal = showModal;
        this.type = type;
    }
}

export enum ModalType {
    SIGN_UP = 'Sign up',
    LOGIN = 'Log in'
}