import styles from './listing-creation.module.css';
import React from 'react';

type Props = {
    currentStep: number,
    nextBtnEnable: boolean,
    onBack: () => void
}

const ListingCreationFooter: React.FC<Props> = ({ currentStep, nextBtnEnable, onBack }) => {
    return (
        <footer id={styles['listing-creation-footer']}>
            <button id={styles['back-btn']} className={styles['listing-creation-btn']} onClick={onBack}>Back</button>
            <p id={styles['steps']}>{`Steps ${currentStep}/1`}</p>
            <button id={styles['next-btn']} className={styles['listing-creation-btn']} disabled={!nextBtnEnable}>Next</button>
        </footer>
    );
}

export default ListingCreationFooter;