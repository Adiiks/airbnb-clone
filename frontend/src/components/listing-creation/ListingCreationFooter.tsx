import { ListingCreationAction, ListingCreationActionType } from './ListingCreation';
import styles from './listing-creation.module.css';
import React from 'react';

type Props = {
    currentStep: number,
    nextBtnEnable: boolean,
    isLoading: boolean,
    onBack: () => void,
    dispatch: React.Dispatch<ListingCreationAction>,
    onCreate: () => void
}

const ListingCreationFooter: React.FC<Props> = ({ currentStep, nextBtnEnable, isLoading, onBack, dispatch, onCreate }) => {
    function handleNextOrCreateClick() {
        if (currentStep !== 7) {
            dispatch({ type: ListingCreationActionType.GO_NEXT_STEP });
        } else {
            onCreate();
        }
    }

    return (
        <footer id={styles['listing-creation-footer']}>
            <button id={styles['back-btn']} className={styles['listing-creation-btn']} onClick={onBack}>Back</button>
            <p id={styles['steps']}>{`Steps ${currentStep}/7`}</p>
            <button
                id={styles['next-btn']}
                className={`${styles['listing-creation-btn']} ${isLoading && styles['loading-btn']}`}
                onClick={handleNextOrCreateClick}
                disabled={!nextBtnEnable || isLoading}
            >
                {currentStep !== 7 ? 'Next' : 'Create'}
            </button>
        </footer>
    );
}

export default ListingCreationFooter;